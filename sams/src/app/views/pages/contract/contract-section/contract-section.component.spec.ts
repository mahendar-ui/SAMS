import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractSectionComponent } from './contract-section.component';

describe('ContractSectionComponent', () => {
  let component: ContractSectionComponent;
  let fixture: ComponentFixture<ContractSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
