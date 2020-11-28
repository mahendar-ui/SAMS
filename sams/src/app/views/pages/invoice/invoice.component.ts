import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/core/reducers';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) {
	}
  ngOnInit(): void {
  }

}
