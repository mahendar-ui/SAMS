import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { User } from '../_models/user.model';
import { Auth } from '../_models/auth.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';
import promise from 'src/assets/plugins/formvalidation/src/js/validators/promise';

const API_USERS_URL = 'http://localhost:3000/api/users';
const API_AUTH_URL = 'http://localhost:3000/api/authentication';
const API_AUTH_TOKEN_VERIFY_URL = environment.hostPath + 'token_verify';
const API_ACCOUNT_PASSWORD_URL = 'http://localhost:3000/api/password-change';
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }
  // password change
  passwordupdate(_user: User):Observable<any>{
    const httpHeaders = new HttpHeaders();
          httpHeaders.set('Content-Type', 'application/json');
            return this.http.put(API_ACCOUNT_PASSWORD_URL, _user, { headers: httpHeaders });
  }
  // Authentication/Authorization
  login(stakeholder:string, email: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(API_AUTH_URL, {stakeholder, email, password}).pipe(
      catchError(err =>
        {return throwError(err)})
    );
  }
  currentUserRoles() : Observable<any>{
    const authInfo : any = JSON.parse(localStorage.getItem('authInfo'));
    if(authInfo){
      const currentUserRolesSplit : any = authInfo.userInfo.stakeholder;
      return of(currentUserRolesSplit);
    }

  }
  currentUser() : Observable<any>{
    const authInfo : any = JSON.parse(localStorage.getItem('authInfo'));
    if(authInfo){
      const currentUserRolesSplit : any = (authInfo.userInfo);
      return of(currentUserRolesSplit);
    }

  }
  TokenVerify():Observable<boolean>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
   // tslint:disable-next-line: ban-types
   return this.http.get<Boolean>(API_AUTH_TOKEN_VERIFY_URL, {headers: httpHeaders})
    .pipe(
      map((res)=>{
      const result :any = res;
      if(result.errorCode === 200){
        return true
      }else{
        return false
      }
      }),
      catchError(err =>
        {return throwError(err)})
    )
  }
   getUserByToken():Observable<User>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return  this.http.get<User>(API_USERS_URL, {headers: httpHeaders})
    .pipe(
      catchError(err =>
        {return throwError(err)})
    )
  }
getToken(){
  const token = localStorage.getItem(environment.authTokenKey);
  return token;
}
  register(user: User): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<User>(API_USERS_URL, user, {headers: httpHeaders})
      .pipe(
        map((res: User) => {
          return res;
        }),
        catchError(err => {
          return null;
        })
      );
  }

  /*
   * Submit forgot password request
   *
   * @param {string} email
   * @returns {Observable<any>}
   */
  public requestPassword(email: string): Observable<any> {
    return this.http.get(API_USERS_URL + '/forgot?=' + email)
      .pipe(catchError(this.handleError('forgot-password', []))
      );
  }


  getAllUsers(): Observable<User[]> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization','Bearer ' +this.getToken());
    return this.http.get<User[]>(API_USERS_URL,{headers:httpHeaders})
    .pipe(
      catchError(err =>
        {return throwError(err)})
    );
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(API_USERS_URL + `/${userId}`);
  }


  // DELETE => delete the user from the server
  deleteUser(userId: number) {
    const url = `${API_USERS_URL}/${userId}`;
    return this.http.delete(url);
  }

  // UPDATE => PUT: update the user on the server
  // tslint:disable-next-line
  updateUser(_user: User): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.put(API_USERS_URL, _user, {headers: httpHeaders});
  }

  // CREATE =>  POST: add a new user to the server
  createUser(user: User): Observable<User> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<User>(API_USERS_URL, user, {headers: httpHeaders});
  }

  // Method from server should return QueryResultsModel(items: any[], totalsCount: number)
  // items => filtered/sorted result
  findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, {headers: httpHeaders});
  }

  // Permission
  getAllPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(API_USERS_URL);
  }

  // getRolePermissions(roleId: number): Observable<Permission[]> {
  //   return this.http.get<Permission[]>(API_PERMISSION_URL + '/getRolePermission?=' + roleId);
  // }

  // // Roles
   getAllRoles(): Observable<Role[]> {
     return this.http.get<Role[]>(API_USERS_URL);
   }

  getRoleById(roleId: number): Observable<Role> {
    return this.http.get<Role>(API_USERS_URL + `/${roleId}`);
  }

  // CREATE =>  POST: add a new role to the server
  createRole(role: Role): Observable<Role> {
    // Note: Add headers if needed (tokens/bearer)
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<Role>(API_USERS_URL, role, {headers: httpHeaders});
  }

  // UPDATE => PUT: update the role on the server
  updateRole(role: Role): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.put(API_USERS_URL, role, {headers: httpHeaders});
  }

  // DELETE => delete the role from the server
  deleteRole(roleId: number): Observable<Role> {
    const url = `${API_USERS_URL}/${roleId}`;
    return this.http.delete<Role>(url);
  }

  // Check Role Before deletion
  isRoleAssignedToUsers(roleId: number): Observable<boolean> {
    return this.http.get<boolean>(API_USERS_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
  }

  findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
    // This code imitates server calls
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<QueryResultsModel>(API_USERS_URL + '/findRoles', queryParams, {headers: httpHeaders});
  }

  /*
   * Handle Http operation that failed.
   * Let the app continue.
    *
  * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}
