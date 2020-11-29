import { Component, Inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthNoticeService, Account,AccounService } from '../../../../core/auth';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AccountRejectComponent } from '../account-reject/account-reject.component';
@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
    <h1 mat-dialog-title>{{data.firstname}} {{data.lastname}}</h1>
    <div mat-dialog-content>
      <p *ngIf='data.status == 0'>Your request to sent to University for validate the application.</p>
      <p *ngIf='data.status == 1'>Application status changed to Approved.</p>
     
    </div>
    <div mat-dialog-actions>
      <button class='btn btn-primary' mat-button [mat-dialog-close]="data.animal" cdkFocusInitial>Ok</button>
    </div>
    `
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
@Component({
  selector: 'kt-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
accountList:any
stakeHolder:any;
stakeholder_bank : any;
stakeholder_university : any;
haveApiServiceData: boolean = false;
apiDataValid$ = new BehaviorSubject<boolean>(this.haveApiServiceData);
  constructor( private accountService:AccounService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    const authInfo : any = JSON.parse(localStorage.getItem('authInfo'));
    this.stakeHolder = authInfo.userInfo.stakeholder;
    this.stakeholder_bank = authInfo.userInfo.stakeholder_bank;
    this.stakeholder_university = authInfo.userInfo.stakeholder_university;
    let stakeholderValue:any;
    if(this.stakeHolder == 'BOS'){
      stakeholderValue = this.stakeholder_bank
    }else if(this.stakeHolder == 'UAD'){
      stakeholderValue = this.stakeholder_university
    }else{
      stakeholderValue = authInfo.userInfo.id;
    }
    let userInfo = {
      stakeholder : this.stakeHolder,
      userId : authInfo.userInfo.id,
      stakeholderValue : stakeholderValue
    }
    this.accountService.getAccountList(userInfo).subscribe(result => {
      debugger;
      if(result){
        this.accountList = result;
        this.haveApiServiceData = true;
        this.apiDataValid$.next(this.haveApiServiceData)
      }
    })
  }
  requestUniversity(account){
    debugger;
    this.accountService.sendBankRequest(account).subscribe(result => {
      if(result){
        console.log(result)
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '350px',
          data: { firstname: result.result.firstname, lastname: result.result.lastname, status:0 }
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
         window.location.reload()
        });
      }
      
    })
  }
  
  applicationReject(account){
    debugger;
    const dialogRef = this.dialog.open(AccountRejectComponent, { data: { account } });
    dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
           window.location.reload()
          });
    // this.accountService.rejectApplication(account).subscribe(result => {
    //   if(result){
    //     console.log(result)
    //     let dialogRef = this.dialog.open(, {
    //       width: '350px',
    //       data: { firstname: result.result.firstname, lastname: result.result.lastname, status:1}
    //     });
    
    //     dialogRef.afterClosed().subscribe(result => {
    //       console.log('The dialog was closed');
    //      window.location.reload()
    //     });
    //   }
      
    // })
  }
  approveApplication(account){
    this.accountService.approveApplication(account).subscribe(result => {
      if(result){
        console.log(result)
        let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '350px',
          data: { firstname: result.result.firstname, lastname: result.result.lastname, status:1}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
         window.location.reload()
        });
      }
      
    })
  }
}
