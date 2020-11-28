import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedContractComponent } from './approved-contract.component';

describe('ApprovedContractComponent', () => {
  let component: ApprovedContractComponent;
  let fixture: ComponentFixture<ApprovedContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
