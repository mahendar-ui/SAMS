import { Component,OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { Router } from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'kt-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {
	}
  ngOnInit(): void {
  }

}