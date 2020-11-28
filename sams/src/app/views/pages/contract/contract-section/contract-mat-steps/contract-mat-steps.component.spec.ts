import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractMatStepsComponent } from './contract-mat-steps.component';

describe('ContractMatStepsComponent', () => {
  let component: ContractMatStepsComponent;
  let fixture: ComponentFixture<ContractMatStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractMatStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractMatStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
