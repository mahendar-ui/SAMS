import { Component,OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { Router } from '@angular/router';
@Component({
  selector: 'kt-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  constructor(private store: Store<AppState>, private router: Router) {
	}
  ngOnInit(): void {
  }
}