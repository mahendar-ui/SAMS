import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) {
	}
  ngOnInit(): void {
  }

}
