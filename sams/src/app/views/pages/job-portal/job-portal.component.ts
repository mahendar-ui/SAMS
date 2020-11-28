import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from'../../../core/reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-job-portal',
  templateUrl: './job-portal.component.html',
  styleUrls: ['./job-portal.component.scss']
})
export class JobPortalComponent implements OnInit {

  constructor(private store: Store<AppState>, private router: Router) {
	}
  ngOnInit(): void {
  }

}
