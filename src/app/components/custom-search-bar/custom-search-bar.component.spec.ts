import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSearchBarComponent } from './custom-search-bar.component';

describe('CustomSearchBarComponent', () => {
  let component: CustomSearchBarComponent;
  let fixture: ComponentFixture<CustomSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomSearchBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
