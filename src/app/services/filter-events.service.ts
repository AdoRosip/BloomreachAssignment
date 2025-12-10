import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { EventDefinition, EventsResponse } from '../contracts';

@Injectable({
  providedIn: 'root'
})
export class FilterEventsService {

  constructor(private http: HttpClient) {}

  //To refac types from any
  getFilters():Observable<EventDefinition[]> {
    const events = this.http.get<EventsResponse>('https://br-fe-assignment.github.io/customer-events/events.json').pipe(map((res) => res.events), shareReplay(1) )
    return events
  }
}
