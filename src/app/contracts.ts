import { Attribute } from "@angular/core"

export interface EventPropertyDefinition {
  property: string,
  type: 'string' | 'number'
}

export interface EventDefinition {
  type: string,
  properties: EventPropertyDefinition[]
}

export interface EventsResponse {
  events: EventDefinition[]
}

export type Operator = 'equals' | 'equal to' | 'does not equal' | 'contains' | 'does not contains' | 'greater than' | 'less than' | 'in between';
export type ValueType = string | number;

export interface AttributeFilter{
  id: string,
  attribute: string | null, // this would carry the property value from the fetch response - to be checked,
  valueType: 'string' | 'number';
  operator: Operator | null,
  value: ValueType | null,
  valueTo?: ValueType | null
}

export interface FunnelStep {
  id:string,
  name:string,
  eventType: string | null //this would be the pagevisit etc.
  filters: AttributeFilter[]
}

export interface CustomerFilterState{
  steps: FunnelStep[]
}
