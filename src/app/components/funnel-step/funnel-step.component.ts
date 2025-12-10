import { Component, EventEmitter, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { AttributeFilter, EventDefinition, EventPropertyDefinition, FunnelStep } from 'src/app/contracts';

@Component({
  selector: 'app-funnel-step',
  templateUrl: './funnel-step.component.html',
  styleUrls: ['./funnel-step.component.scss']
})
export class FunnelStepComponent {

@Input() step!: FunnelStep
@Input() events: EventDefinition[] | null = null

@Output() stepChange = new EventEmitter<FunnelStep>()
@Output() delete = new EventEmitter<void>();
@Output() duplicate = new EventEmitter<void>();

selectedEvent: string = ''
availableAttributes: EventPropertyDefinition[] = []

  private nextFilterId(): string {
      return `f-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  public getAvailableAttributes() {
    const currentEvent = this.events?.find((event) => this.step.eventType === event.type)
    this.availableAttributes = currentEvent?.properties ?? []
  }

  ngOnChanges(change:SimpleChanges) {
    if(change['step']) {
      this.getAvailableAttributes()
    }
  }

  public onEventTypeChange(type: string) {
    const updated: FunnelStep = {
        ...this.step,
        eventType: type,
        // when event changes, keep filters but drop attribute-related info
        filters: this.step.filters.map((f) => ({
          ...f,
          attribute: null,
          type: undefined,
          operator: null,
          value: null,
          valueTo: null,
        })),
      };
      this.stepChange.emit(updated);
  }

  public onFilterChange(filterId: string, filter: AttributeFilter){
      const updatedFunnelStepState: FunnelStep = {
        ...this.step,
        filters: this.step.filters.map((f) => (f.id === filterId ? filter : f)),
      }

      this.stepChange.emit(updatedFunnelStepState)
    }

  public addFilter() {
    const newFilter: AttributeFilter = {
      id: this.nextFilterId(),
      attribute: null,
      valueType: 'string',
      operator: null,
      value: null,
      valueTo: null,
    };
    const updated: FunnelStep = {
      ...this.step,
      filters: [...this.step.filters, newFilter],
    };
    this.stepChange.emit(updated);
  }

  public removeFilter(filterId: string) {
    const updated: FunnelStep = {
      ...this.step,
      filters: this.step.filters.filter((f) => f.id !== filterId),
    };
    this.stepChange.emit(updated);
  }

  public trackByFilter = (_: number, f: AttributeFilter) => f.id;

  get isEventSelected(){
    return !!this.step.eventType
  }
}
