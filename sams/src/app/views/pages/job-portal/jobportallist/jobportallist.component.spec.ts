import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobportallistComponent } from './jobportallist.component';

describe('JobportallistComponent', () => {
  let component: JobportallistComponent;
  let fixture: ComponentFixture<JobportallistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobportallistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobportallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
