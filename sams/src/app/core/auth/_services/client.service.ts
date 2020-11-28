import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { Client } from '../_models/client.model';
import { HttpUtilsService } from '../../_base/crud';
// const API_PERMISSION_URL = 'api/permissions';
const API_CLIENT_URL ='http://localhost:3000/api/create-client';
const API_CLIENTS_URL = 'http://localhost:3000/api/clients';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 // don't use "any", type your data instead!
 private apiData = new BehaviorSubject<any>(null);
 public apiData$ = this.apiData.asObservable();

  constructor(public http:HttpClient,
    private httpUtils: HttpUtilsService) { }

  saveClient(client : Client): Observable<Client> {
    const httpHeaders = new HttpHeaders();   httpHeaders.set('Content-Type', 'application/json');
         return this.http.post<Client>(API_CLIENT_URL, client, { headers: httpHeaders});
     }

     getAllClients(): Observable<Client[]> {
      return this.http.get<Client[]>(API_CLIENTS_URL);
    }
    getClientById(clientId: number): Observable<Client> {
      return this.http.get<Client>(API_CLIENTS_URL + `/${clientId}`);
    }
    getClientname(clientname): Observable<Client> {
      return this.http.get<Client>(API_CLIENTS_URL + `/${clientname}`);
    }
    updateClient(client: Client): Observable<any> {
          const httpHeaders = new HttpHeaders();
          httpHeaders.set('Content-Type', 'application/json');
            return this.http.put(API_CLIENTS_URL, client, { headers: httpHeaders });
      }
    deleteClient(clientId: number) {
		const url = `${API_CLIENTS_URL}/${clientId}`;
		return this.http.delete<Client>(url);
    }
    // here we set/change value of the observable
    setData(clientApiData) {
    this.apiData.next(clientApiData)
    }
}
