// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { AuthService, currentUser, Logout, User } from '../../../../../core/auth';

@Component({
  selector: 'kt-user-profile4',
  templateUrl: './user-profile4.component.html',
})
export class UserProfile4Component implements OnInit {
  // Public properties
  user$: Observable<User>;

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;
  users:User;
  /**
   * Component constructor
   *
   * @param store: Store<AppState>
   */
  constructor(private store: Store<AppState>,
    private auth: AuthService,) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    this.user$ = this.store.pipe(select(currentUser));
    this.auth.currentUser().subscribe(
        users => {
          if(users){
            this.users =users;
          }
        }
      );
  }

  /**
   * Log out
   */
  logout() {
    this.store.dispatch(new Logout());
  }
}
