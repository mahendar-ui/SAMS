import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError  } from 'rxjs';
import { Account } from '../_models/account.model';
import { Auth } from '../_models/auth.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { environment } from '../../../../environments/environment';
import promise from 'src/assets/plugins/formvalidation/src/js/validators/promise';
import { User } from '../_models/user.model';
const API_ACCOUNT_URL_ = 'http://localhost:3000/api/account';
const API_ACCOUNT_URL = 'http://localhost:3000/api/accounts';
const API_ACCOUNT_BANK_REQUEST_URL = 'http://localhost:3000/api/account-to-bank';
const API_ACCOUNT_REJECT_URL = 'http://localhost:3000/api/reject-application';
const API_ACCOUNT_APPROVE_URL = 'http://localhost:3000/api/approve-application';
const API_AUTH_URL = 'http://localhost:3000/api/authentication';
const API_AUTH_TOKEN_VERIFY_URL = environment.hostPath + 'token_verify';
@Injectable({
  providedIn: 'root'
})
export class AccounService {
  constructor(private http: HttpClient) {
  }
  // Authentication/Authorization
  
  register(account: Account): Observable<any> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<Account>(API_ACCOUNT_URL_, account, {headers: httpHeaders})
      .pipe(
        map((res: Account) => {
          return res;
        }),
        catchError(err => {
          return null;
        })
      );
  }
  getAccount(accountId: number): Observable<Account> {
    return this.http.get<Account>(API_ACCOUNT_URL + `/${accountId}`);
  }
  getAccountList(userinfo:any): Observable<any> {
    const httpHeaders = new HttpHeaders();
          httpHeaders.set('Content-Type', 'application/json');
    return this.http.post(API_ACCOUNT_URL,userinfo, {headers: httpHeaders}).pipe(
      map((res: Account) => {
        return res;
      }),
      catchError(err => {
        return null;
      })
    );
  }
  sendBankRequest(account:Account):Observable<any>{
    const httpHeaders = new HttpHeaders();
          httpHeaders.set('Content-Type', 'application/json');
            return this.http.put(API_ACCOUNT_BANK_REQUEST_URL, account, { headers: httpHeaders });
  }
  rejectApplication(account:Account):Observable<any>{
    const httpHeaders = new HttpHeaders();
          httpHeaders.set('Content-Type', 'application/json');
            return this.http.put(API_ACCOUNT_REJECT_URL, account, { headers: httpHeaders });
  }
  approveApplication(account:Account):Observable<any>{
    const httpHeaders = new HttpHeaders();
          httpHeaders.set('Content-Type', 'application/json');
            return this.http.put(API_ACCOUNT_APPROVE_URL, account, { headers: httpHeaders });
  }
  
  /*
   * Submit forgot password request
   *
   * @param {string} email
   * @returns {Observable<any>}
   */
  public requestPassword(email: string): Observable<any> {
    return this.http.get(API_ACCOUNT_URL + '/forgot?=' + email)
      .pipe(catchError(this.handleError('forgot-password', []))
      );
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
