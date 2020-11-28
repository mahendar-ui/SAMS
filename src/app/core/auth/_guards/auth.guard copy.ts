// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';
// NGRX
import { select, Store } from '@ngrx/store';
// Layout
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud';
// Auth reducers and selectors
import { AppState} from '../../../core/reducers/';
import { isLoggedIn } from '../_selectors/auth.selectors';
import { environment } from '../../../../environments/environment.prod';
// service
import { AuthService } from '../_services'
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<AppState>, private router: Router,
      private authService : AuthService,
      private layoutUtilsService : LayoutUtilsService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
        return this.store
            .pipe(
                select(isLoggedIn),
                tap(loggedIn => {
                    if (!loggedIn) {
                        this.router.navigateByUrl('/auth/login');
                    }
                })
            );
    }
    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    //   return this.store
    //     .pipe(
    //       select(isLoggedIn),
    //       tap(loggedIn => {
    //         const token = localStorage.getItem(environment.authTokenKey);
    //         if (!loggedIn) {
    //           this.router.navigateByUrl('/auth/login');
    //         }
    //         else {
    //           let curentUserRoles;
    //          this.authService.getUserByToken().subscribe(
    //             result => {
    //               console.log(result);
    //               if (result) {
    //                 let response:any = result;
    //                 if (response.errorCode === 403) {
    //                   const dialogRef = this.layoutUtilsService.logoutElement("Session Expired", "Please login again", "Redirect to Login");
    //                   dialogRef.afterClosed().subscribe(res => {
    //                     if (!res) {
    //                       return;
    //                     }
                        
    //                     this.layoutUtilsService.showActionNotification("Redirect to Login", MessageType.Delete);
  
    //                   });
    //                 }else{
    //                   this.authService.currentUserRoles().subscribe(
    //                     userRoles => {
    //                       if (userRoles) {
    //                         curentUserRoles = userRoles;
    //                         return;
    //                       }
    //                     }
    //                   );
    //                   if (route.data.role) {
    //                     let findRole = false;
    //                     for (let i = 0; i <= curentUserRoles.length; i++) {
    //                       if (route.data.role.indexOf(curentUserRoles[i]) > -1) {
    //                         findRole = true;
    //                       }
    //                     }
    //                     if (findRole) {
    //                       return true;
    //                     } else {
    //                       this.router.navigateByUrl('/dashboard');
    //                       return false;
    //                     }
    //                   }
    //                   else {
    //                     return true;
    //                   }
    //                 }
    //               }
    //             },
    //             (err) => {
    //               if(err.status === 0){
    //                 this.router.navigateByUrl('error/500');
    //               }
    //             }
    //           )
    //         }
    //       })
    // )
    //     }
  }
