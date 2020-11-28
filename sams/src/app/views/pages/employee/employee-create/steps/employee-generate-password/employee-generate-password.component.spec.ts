import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGeneratePasswordComponent } from './employee-generate-password.component';

describe('EmployeeGeneratePasswordComponent', () => {
  let component: EmployeeGeneratePasswordComponent;
  let fixture: ComponentFixture<EmployeeGeneratePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeGeneratePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeGeneratePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
