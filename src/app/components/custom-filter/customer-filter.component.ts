import { Component, Input } from '@angular/core';
import { AttributeFilter, CustomerFilterState, EventDefinition, FunnelStep } from 'src/app/contracts';

@Component({
  selector: 'app-customer-filter',
  templateUrl: './customer-filter.component.html',
  styleUrls: ['./customer-filter.component.scss']
})
export class CustomerFilterComponent {

   @Input() events: EventDefinition[] | null = null

   private stepCounter = 1
   private idCounter = 1

   state: CustomerFilterState = {
    steps: [this.createEmptyStateStep()]
   }

   // CHeck later if there is a better way to handlee the ids
   private nextId(): string {
    return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
   }

   private createEmptyStateFilter(): AttributeFilter{
    return {
      id: this.nextId(),
      attribute: null,
      valueType: 'string',
      operator: null,
      value: null,
      valueTo: null
    }
   }

   private createEmptyStateStep(): FunnelStep {
    const step: FunnelStep = {
      id: this.nextId(),
      name: `${this.stepCounter}. Step`,
      eventType: null,
      filters: [this.createEmptyStateFilter()]
    };
    this.stepCounter++;
    return step;
   }


   public addFunnelStep() {
    this.state = {
      ...this.state,
      steps: [...this.state.steps, this.createEmptyStateStep()],
    }
   }

   public discardAllSteps() {
    this.stepCounter = 1
    this.state = {
      steps: [this.createEmptyStateStep()],
    };
   }

   public trackByStep = (_: number, step: FunnelStep) => step.id;


   public onStepChange(stepId: string, updated: FunnelStep) {
    const stepIndex = this.state.steps.findIndex(s => s.id === stepId);
    const stepNumber = stepIndex + 1;
    const updatedName = updated.eventType
      ? `${stepNumber}. Step: ${updated.eventType}`
      : `${stepNumber}. Step`;

    this.state = {
      ...this.state,
      steps: this.state.steps.map((s) =>
        s.id === stepId ? { ...updated, name: updatedName } : s
      ),
    };
  }


   public deleteStep(stepId: string) {
    const filteredSteps = this.state.steps.filter((event) => event.id !== stepId);

    // Recalculate step names after deletion
    // Could extract to some utils fnc if I have time
    const updatedSteps = filteredSteps.map((step, index) => {
      const stepNumber = index + 1;
      const newName = step.eventType
        ? `${stepNumber}. Step: ${step.eventType}`
        : `${stepNumber}. Step`;
      return { ...step, name: newName };
    });

    this.state = {
      ...this.state,
      steps: updatedSteps
    };
   }

  public duplicateStep(stepId: string) {
    const original = this.state.steps.find((s) => s.id === stepId);
    if (!original) return;

    const newStepNumber = this.state.steps.length + 1;
    const newStepName = original.eventType
      ? `${newStepNumber}. Step: ${original.eventType}`
      : `${newStepNumber}. Step`;

    const clone: FunnelStep = {
      ...original,
      id: this.nextId(),
      name: newStepName,
      filters: original.filters.map((f) => ({
        ...f,
        id: this.nextId(),
      })),
    };

    this.state = {
      ...this.state,
      steps: [...this.state.steps, clone],
    };
  }

  // To be refactored if time
  public applyFilters() {
    const payload = {
      steps: this.state.steps.map((s) => ({
        eventType: s.eventType,
        name: s.name,
        filters: s.filters.map((f) => ({
          attribute: f.attribute,
          type: f.valueType,
          operator: f.operator,
          value: f.value,
          valueTo: f.valueTo,
        })),
      })),
    };
    console.log('Customer filter payload:', payload);
  }
}
