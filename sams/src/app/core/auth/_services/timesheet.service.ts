import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { Observable } from 'rxjs';
// model
import { Timesheet } from '../_models/timesheet.model';

const API_TIMESHEETS_URL ='http://localhost:3000/api/timesheets';
const API_SENDEMAIL_URL ='http://localhost:3000/api/send-email';
@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(public http:HttpClient,
    private httpUtils: HttpUtilsService) { }
     getAllTimesheets(): Observable<Timesheet[]> {
      return this.http.get<Timesheet[]>(API_TIMESHEETS_URL);
    }
    getTimesheetById(timesheetId: number): Observable<Timesheet> {
      return this.http.get<Timesheet>(API_TIMESHEETS_URL + `/${timesheetId}`);
    }
    invoicesend(docDefinition): Observable<Timesheet> {
    const httpHeaders = new HttpHeaders();   httpHeaders.set('Content-Type', 'application/json');
        return this.http.post<Timesheet>(API_SENDEMAIL_URL, docDefinition, { headers: httpHeaders});
    }
}
