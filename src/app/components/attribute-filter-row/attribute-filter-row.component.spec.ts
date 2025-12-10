import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeFilterRowComponent } from './attribute-filter-row.component';

describe('AttributeFilterRowComponent', () => {
  let component: AttributeFilterRowComponent;
  let fixture: ComponentFixture<AttributeFilterRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeFilterRowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeFilterRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
