import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { AttributeFilter, EventPropertyDefinition, Operator } from 'src/app/contracts';


const STRING_OPERATORS: Operator[] = ['equals', 'does not equal', 'contains', 'does not contains']
const NUMBER_OPERATORS: Operator[] = ['equal to', 'in between', 'less than', 'greater than']

@Component({
  selector: 'app-attribute-filter-row',
  templateUrl: './attribute-filter-row.component.html',
  styleUrls: ['./attribute-filter-row.component.scss']
})

export class AttributeFilterRowComponent {

  @Input() attributes: EventPropertyDefinition[] = []
  @Input() filter!: AttributeFilter
  @Input() isEventSelected: boolean = false
  @Input() isLastFilter: boolean = false
  @Input() isFirstFilter: boolean = false
  @Input() totalFilters: number = 1

  @Output() filterChange = new EventEmitter<AttributeFilter>()
  @Output() remove = new EventEmitter<void>()
  @Output() addMoreFilter = new EventEmitter<void>()

  STRING_OPERATORS = STRING_OPERATORS;
  NUMBER_OPERATORS = NUMBER_OPERATORS;

  isAttributeRquested = false
  isDropdownOpen = false;

  ngOnInit() {
    // Fix for the display issue of selections, now itshoould show attribute form if:
    // Filter already has an attribute (for duple use case)
    // AND This is NOT the first filter (For refine more use case)
    if (this.filter.attribute || !this.isFirstFilter) {
      this.isAttributeRquested = true;
    }
  }

  get selectedType(): 'string' | 'number' {
    return this.filter.valueType ?? 'string';
  }

  get operatorOptions(): Operator[] {
    return this.selectedType === 'number' ? NUMBER_OPERATORS : STRING_OPERATORS;
  }

  get isBetween(): boolean {
    return this.filter.operator === 'in between';
  }

  get operatorDisplayText(): string {
    return this.filter.operator || 'Select operator';
  }

  public toggleDropdown() {
    if (this.filter.attribute) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  public closeDropdown() {
    this.isDropdownOpen = false;
  }

  public onAttributeChange(propertyName: string) {
    const selectedAttribute = this.attributes.find(attr => attr.property === propertyName);
    const attributeType = selectedAttribute?.type || 'string';
    const operators = attributeType === 'number' ? NUMBER_OPERATORS : STRING_OPERATORS;
    const defaultOperator = operators[0];
    const updated: AttributeFilter = {
      ...this.filter,
      attribute: propertyName,
      valueType: attributeType,
      operator: defaultOperator,
      value: null,
      valueTo: null
    };
    this.filterChange.emit(updated);
  }

  public switchType(type: 'string' | 'number') {
    // TO-Do: handle the default operator selection if time.
    const updated: AttributeFilter = {
      ...this.filter,
      valueType: type,
      operator: null,
      value: null,
      valueTo: null
    };
    this.filterChange.emit(updated);
  }

  public onOperatorChange(op: Operator) {
    const updatedOperatorState: AttributeFilter = {
      ...this.filter,
      operator: op,
      valueTo: op === 'in between' ? this.filter.valueTo : null
    }
    this.filterChange.emit(updatedOperatorState);
    this.closeDropdown();
  }

  public onValueChange(val: string) {
    const parsed =
      this.selectedType === 'number' && val !== '' ? Number(val) : val;
    const updated: AttributeFilter = {
      ...this.filter,
      value: parsed as any
    };
    this.filterChange.emit(updated);
  }

  public onValueToChange(val: string) {
    const parsed =
      this.selectedType === 'number' && val !== '' ? Number(val) : val;
    const updated: AttributeFilter = {
      ...this.filter,
      valueTo: parsed as any
    };
    this.filterChange.emit(updated);
  }

  public onRemove() {
    // Only reset the first filter if it's the ONLY filter
    // Otherwise, remove it entirely so the next one becomes first
    if (this.isFirstFilter && this.totalFilters === 1) {
      const reset: AttributeFilter = {
        ...this.filter,
        attribute: null,
        operator: null,
        value: null,
        valueTo: null
      };
      this.isAttributeRquested = false;
      this.filterChange.emit(reset);
    } else {
      this.remove.emit();
    }
  }

  public toggleAttributeSelection() {
    this.isAttributeRquested = !this.isAttributeRquested
  }
}
