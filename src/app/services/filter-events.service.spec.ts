import { TestBed } from '@angular/core/testing';

import { FilterEventsService } from './filter-events.service';

describe('FilterEventsService', () => {
  let service: FilterEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
