import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnelStepComponent } from './funnel-step.component';

describe('FunnelStepComponent', () => {
  let component: FunnelStepComponent;
  let fixture: ComponentFixture<FunnelStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunnelStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunnelStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
