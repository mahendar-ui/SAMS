import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Client, ClientService } from 'src/app/core/auth';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QueryParamsModel, LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SubheaderService } from 'src/app/core/_base/layout';

@Component({
  selector: 'kt-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  // Table fields
  dataSource;
  displayedColumns = ['id', 'firstname','lastname', 'email', 'contactname','contactphone','contactemail','clienType', 'actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('sort1', { static: true }) sort: MatSort;
  // Filter fields
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  selection = new SelectionModel<Client>(true, []);


  /**
   * @param activatedRoute: ActivatedRoute
   * @param router: Router
   */

  constructor(
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
    private subheaderService: SubheaderService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadClientsList();
    this.initClient();
  }
  loadClientsList() {
    let clientsList;
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
    const entitiesSubscription = this.clientService.getAllClients().subscribe(
      results => {
        if (!results) {
          data = false;
          return;
        }
        clientsList = results;
        this.dataSource = new MatTableDataSource(clientsList);
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
  editClient(id) {
    this.router.navigate(['/client/client-create', id], { relativeTo: this.activatedRoute });
  }

  deleteClient(_client: Client) {
    const _title = 'Client Delete';
    const _description = 'Are you sure to permanently delete this client?';
    const _waitDesciption = 'Client is deleting...';
    const _deleteMessage = `Client has been deleted`;

    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res => {
      if (!res) {
        return;
      }
      this.clientService.deleteClient(_client.id).subscribe(
        response => {
          if (!response) {
            return;
          }
          this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete);
          this.loadClientsList();
          this.getAllClients();
        }
      )
    });
  }
  getAllClients() {
  }
  /*** Init Client
   */
  initClient() {
    this.subheaderService.setTitle('Client List');
    this.subheaderService.setBreadcrumbs([
      { title: 'Client', page: `client` },
      { title: 'Client List', page: `client/client-list` },
    ]);
    return;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
  applyClientFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
