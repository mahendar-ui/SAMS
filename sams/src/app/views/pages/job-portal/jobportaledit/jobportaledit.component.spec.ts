import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobportaleditComponent } from './jobportaledit.component';

describe('JobportaleditComponent', () => {
  let component: JobportaleditComponent;
  let fixture: ComponentFixture<JobportaleditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobportaleditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobportaleditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
