import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPortalCreateComponent } from './job-portal-create.component';

describe('JobPortalCreateComponent', () => {
  let component: JobPortalCreateComponent;
  let fixture: ComponentFixture<JobPortalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPortalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPortalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
