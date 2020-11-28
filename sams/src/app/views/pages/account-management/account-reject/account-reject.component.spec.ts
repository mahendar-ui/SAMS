import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRejectComponent } from './account-reject.component';

describe('AccountRejectComponent', () => {
  let component: AccountRejectComponent;
  let fixture: ComponentFixture<AccountRejectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRejectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRejectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
