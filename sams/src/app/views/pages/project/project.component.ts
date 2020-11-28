import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {
	}
  ngOnInit(): void {
  }

}