import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { JobPortal } from '../_models/jobportal.model';


const API_JOBPORTAL_URL ='http://localhost:3000/api/create-jobportal';
const API_JOBPORTALS_URL ='http://localhost:3000/api/jobportals';
@Injectable({
  providedIn: 'root'
})
export class JobportalService {

  constructor(public http:HttpClient,
    private httpUtils: HttpUtilsService) { }
    saveJobPortal(JobPortalForm : FormGroup): Observable<JobPortal> {
      const httpHeaders = new HttpHeaders();   httpHeaders.set('Content-Type', 'application/json');
           return this.http.post<JobPortal>(API_JOBPORTAL_URL, JobPortalForm, { headers: httpHeaders});
       }
       getAllJobPortals(): Observable<JobPortal[]> {
        return this.http.get<JobPortal[]>(API_JOBPORTALS_URL);
      }
      getJobPortalById(jobportalId: number): Observable<JobPortal> {
        return this.http.get<JobPortal>(API_JOBPORTALS_URL + `/${jobportalId}`);
      }
      updateJobPortal(jobportal: JobPortal): Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Content-Type', 'application/json');
          return this.http.put(API_JOBPORTALS_URL, jobportal, { headers: httpHeaders });
    }
    deleteJobPortal(jobportalId: number) {
      const url = `${API_JOBPORTALS_URL}/${jobportalId}`;
      return this.http.delete<JobPortal>(url);
      }
}
