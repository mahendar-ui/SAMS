import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWizardClickableStepsComponent } from './client-wizard-clickable-steps.component';

describe('ClientWizardClickableStepsComponent', () => {
  let component: ClientWizardClickableStepsComponent;
  let fixture: ComponentFixture<ClientWizardClickableStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientWizardClickableStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientWizardClickableStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
