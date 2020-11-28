import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccounService, Account } from 'src/app/core/auth';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';

@Component({
  selector: 'kt-account-reject',
  templateUrl: './account-reject.component.html',
  styleUrls: ['./account-reject.component.scss']
})
export class AccountRejectComponent implements OnInit {
  rejectForm:FormGroup;
  account: Account;
  stakeHolder:any;
  constructor(private accountService:AccounService,
    private layoutUtilsService: LayoutUtilsService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.account = this.data.account;
    const authInfo : any = JSON.parse(localStorage.getItem('authInfo'));
    this.stakeHolder = authInfo.userInfo.stakeholder;
    this.rejectForm = new FormGroup({
      bos_message: new FormControl(),
      uad_message:new FormControl()
     });
  }
  applicationRejec(){
    const controls = this.rejectForm.controls;
        const _account: Account = new Account();
        _account.clear();
        _account.id=this.account.id;
        _account.bos_message = controls.bos_message.value;
        _account.uad_message=controls.uad_message.value;
        this.accountService.rejectApplication(_account).subscribe(result => {
          results => {
            if (!results) {
              console.log('application not rejected');
            }
            const message = `application rejected.`;
            this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
            window.location.reload();
          }
        });
      }
}
