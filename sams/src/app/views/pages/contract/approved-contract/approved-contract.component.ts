import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Contract } from 'src/app/core/auth';
import { ContractService } from 'src/app/core/auth/_services/contract.service';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';

@Component({
  selector: 'kt-approved-contract',
  templateUrl: './approved-contract.component.html',
  styleUrls: ['./approved-contract.component.scss']
})
export class ApprovedContractComponent implements OnInit {
  approvedForm:FormGroup;
  contract:Contract;
  contracts: any;
  constructor(private contractService: ContractService,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,
    private approvedFB: FormBuilder,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.contract = this.data.contract;
    this.approvedForm = new FormGroup({
      contract_status: new FormControl()
     });
     this.loadContractsList();
  }
  loadContractsList(){
    this.contractService.getAllContracts().subscribe(results => {
      if(results){
        this.contracts =results;
      }
    });
  }
 contractSubmit(){
  const controls = this.approvedForm.controls;
  const _contract : any = new Contract();
  _contract.clear();
  _contract.id=this.contract;
  _contract.contract_status=controls.contract_status.value;
  this.contractService.approvedContract(_contract).subscribe(
    results => {
    if(!results){
    const text = `Contract has been not updated.`;
    this.layoutUtilsService.showActionNotification(text, MessageType.Create, 5000, true, true);
    }
    const message = `Contract successfully has been updated.`;
    this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
    this.dialogRef.closeAll();
    window.location.reload();
    this.loadContractsList();
   }
  )
  }

}
