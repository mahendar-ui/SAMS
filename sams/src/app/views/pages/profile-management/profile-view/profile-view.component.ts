// Angular
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { tap } from 'rxjs/operators';
import {ProfileService} from '../../../../core/auth';
import { result } from 'lodash';
@Component({
  selector: 'kt-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  constructor(private profileService: ProfileService,) { }
  profile:any;
  ngOnInit(): void {
    const authInfo : any = JSON.parse(localStorage.getItem('authInfo'));
this.profileService.getUserById(authInfo.userInfo.id).subscribe(result => {
  if(result){
    this.profile = result;
  }
})
  }
}
