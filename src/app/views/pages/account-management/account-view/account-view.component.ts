import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthNoticeService, Account,AccounService } from '../../../../core/auth';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'kt-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit {

  constructor(private accountService: AccounService,) { }
  account:any;
  ngOnInit(): void {
    const authInfo : any = JSON.parse(localStorage.getItem('authInfo'));
this.accountService.getAccount(authInfo.userInfo.id).subscribe(result => {
  if(result){
    this.account = result;
  }
})
  }

}
