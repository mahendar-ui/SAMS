import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, Contract, Project } from 'src/app/core/auth';
import { ContractService } from 'src/app/core/auth/_services/contract.service';
import { LayoutUtilsService, MessageType, QueryParamsModel } from 'src/app/core/_base/crud';
import { SubheaderService } from 'src/app/core/_base/layout';
import { ApprovedContractComponent } from '../approved-contract/approved-contract.component';

@Component({
  selector: 'kt-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {
  // Table fields
  dataSource;
  displayedColumns = ['id', 'consultantname','jobid','projectname','clientname','employeename','startdate','enddate','status', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', { static: true }) sort: MatSort;
  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  selection = new SelectionModel<Contract>(true, []);
  contract:Contract;
  project:Project;
  curentUserRoles:any;
  constructor( private contractService: ContractService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    private authService : AuthService,
    private subheaderService: SubheaderService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.loadContractsList();
    this.initContract();
    this.authService.currentUserRoles().subscribe(
      userRoles => {
        if (userRoles) {
          this.curentUserRoles = userRoles;
        }
      }
    );
  }
  initContract(){
    this.subheaderService.setTitle('Contract List');
    this.subheaderService.setBreadcrumbs([
      { title: 'Contract', page: `/contract/contract-create` },
      { title: 'Contract List', page: `/contract/contract-list` },
    ]);
    return;
  }
  loadContractsList(){
    let contractsList;
    // tslint:disable-next-line: no-inferrable-types
    let data: boolean = true;
    this.selection.clear();
    const queryParams = new QueryParamsModel(
      this.filterConfiguration(),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    // Call request from server
    const entitiesSubscription = this.contractService.getAllContracts().subscribe(
      results => {
        if (!results) {
          data = false;
          return;
        }
        contractsList = results;
        this.dataSource = new MatTableDataSource(contractsList);
        this.dataSource.paginator = this.paginator;
      }
    )
  }
  filterConfiguration(): any {
    const filter: any = {};
    const searchText: string = this.searchInput.nativeElement.value;
    filter.title = searchText;
    return filter;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  editContract(id){
    this.router.navigate(['/contract/contract-edit', id], { relativeTo: this.activatedRoute });
  }
  deleteContract(_contract: Contract) {
    const _title = 'Consultant Name:'+ '   '+ _contract.consultname;
    const _description = 'Are you sure to permanently delete this Contract?';
    const _waitDesciption = 'Contract is deleting...';
    const _deleteMessage = `Contract has been deleted`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.contractService.deleteContract(_contract.id).subscribe(
        response => {
          if (!response) {
            return;
          }
          this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
          this.getAllContracts();
          this.loadContractsList();
        }
      )
    });
  }
  approvedContract(_contract: Contract){
  if( _contract.contract_status=="Pending"){
    _contract.contract_status="Approved";
  }
  if( _contract.contract_status=="Approved"){
    _contract.contract_status="Cancelled";
  }
  if(_contract.contract_status=="Cancelled"){
    _contract.contract_status="Approved";
  }
  this.contractService.approvedContract(_contract).subscribe(
    results => {
      if(results){
      const message = `Contract successfully has been updated.`;
      this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
      this.loadContractsList();
      }
    });
  }
  cancelContract(_contract: Contract){
    if( _contract.contract_status=="Approved"){
    _contract.contract_status="Cancelled";
    }
    this.contractService.approvedContract(_contract).subscribe(
      results => {
        const message = `Contract successfully has been updated.`;
        this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
        this.loadContractsList();
      });
  }
  getAllContracts(){

  }
  applyContractFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
