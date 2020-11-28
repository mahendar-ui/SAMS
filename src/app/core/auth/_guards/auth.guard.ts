// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
//environment
import { environment } from '../../../../environments/environment.prod';
// Layout
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud';
// Auth reducers and selectors
import { AppState} from '../../../core/reducers/';
import { isLoggedIn } from '../_selectors/auth.selectors';
//services
import { AuthService } from '../_services/auth.service';
import { map } from 'lodash';
import { async } from '@angular/core/testing';
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, 
        private router: Router,
        private authService : AuthService,
        private layoutUtilsService : LayoutUtilsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //    return of(true);
    const token = localStorage.getItem(environment.authTokenKey);
    ;
    if(token){
       return this.authService.TokenVerify().pipe(
           tap(result => {
               if(!result){
                 if(this.router.url === '/auth/login'){
                   localStorage.clear();
                 }else{
                const dialogRef = this.layoutUtilsService.logoutElement("Session Expired", "Please login again", "Redirect to Login");
                dialogRef.afterClosed().subscribe(res => {
                  if (!res) {
                    return;
                  }
                  
                  this.layoutUtilsService.showActionNotification("Redirect to Login", MessageType.Delete);

                });
              }
               }else{
                let curentUserRoles;
                this.authService.currentUserRoles().subscribe(
                    userRoles => {
                      if (userRoles) {
                        curentUserRoles = userRoles;
                        return;
                      }
                    }
                  );
                  if (route.data.role) {
                    let findRole = false;
                    let roleId = route.data.role;
                    for (let i = 0; i <= curentUserRoles.length; i++) {
                      // if (route.data.role[i].indexOf(curentUserRoles[i]) > -1) {
                      //   findRole = true;
                      // }
                      if(roleId.find(role => role.type === curentUserRoles)){
                        findRole = true;
                      }
                    }
                    if (findRole) {
                      return true;
                    } else {
                      this.router.navigateByUrl('/dashboard');
                      return false;
                    }
                  }
                  else {
                    return true;
                  }
               }
               
        },error => {
         if(error.status === 0){
           this.router.navigateByUrl('/error/500')
         }
         }
        )
       )
    }else{
        return this.router.navigateByUrl('/auth/login');
    }
    }
}
