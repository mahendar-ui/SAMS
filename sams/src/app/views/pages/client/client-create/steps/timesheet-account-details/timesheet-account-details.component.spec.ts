import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetAccountDetailsComponent } from './timesheet-account-details.component';

describe('TimesheetAccountDetailsComponent', () => {
  let component: TimesheetAccountDetailsComponent;
  let fixture: ComponentFixture<TimesheetAccountDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesheetAccountDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
