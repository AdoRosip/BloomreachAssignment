import { Component } from '@angular/core';
import { FilterEventsService } from './services/filter-events.service';
import { Observable } from 'rxjs';
import { EventDefinition } from './contracts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  events$!:Observable<EventDefinition[]>

  constructor(private eventsService:FilterEventsService){

  }


  ngOnInit() {
    this.events$ = this.eventsService.getFilters()
  }
}
