import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWizardClickableStepsComponent } from './employee-wizard-clickable-steps.component';

describe('EmployeeWizardClickableStepsComponent', () => {
  let component: EmployeeWizardClickableStepsComponent;
  let fixture: ComponentFixture<EmployeeWizardClickableStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWizardClickableStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWizardClickableStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
