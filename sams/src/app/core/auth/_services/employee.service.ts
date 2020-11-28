import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Employee } from '../_models/employee.model';
import { HttpUtilsService } from '../../_base/crud';

import { map, catchError, retry } from 'rxjs/operators';



// const API_PERMISSION_URL = 'api/permissions';
const API_EMPLOYEE_URL ='http://localhost:3000/api/create-employee';
const API_EMPLOYEES_URL = 'http://localhost:3000/api/employees';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http:HttpClient,
    private httpUtils: HttpUtilsService) { }

  saveEmployee(employee: Employee): Observable<Employee> {
    const httpHeaders = new HttpHeaders();   httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<Employee>(API_EMPLOYEE_URL, employee, {
           headers: httpHeaders,
          });
     }
     getAllEmployees(): Observable<Employee[]> {
      return this.http.get<Employee[]>(API_EMPLOYEES_URL);
    }
    getEmployeeById(employeeId: number): Observable<Employee> {
      return this.http.get<Employee>(API_EMPLOYEES_URL + `/${employeeId}`);
    }
    updateEmployee(employee: Employee): Observable<any> {
          const httpHeaders = new HttpHeaders();
          httpHeaders.set('Content-Type', 'application/json');
            return this.http.put(API_EMPLOYEES_URL, employee, { headers: httpHeaders });
      }
    deleteEmployee(employeeId: number) {
		const url = `${API_EMPLOYEES_URL}/${employeeId}`;
		return this.http.delete<Employee>(url);
    }

  fileUpload(formData: any) {
    return this.http.post(API_EMPLOYEE_URL, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }
}
