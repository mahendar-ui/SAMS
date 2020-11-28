import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfessionalInfoComponent } from './employee-professional-info.component';

describe('EmployeeProfessionalInfoComponent', () => {
  let component: EmployeeProfessionalInfoComponent;
  let fixture: ComponentFixture<EmployeeProfessionalInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeProfessionalInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfessionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
