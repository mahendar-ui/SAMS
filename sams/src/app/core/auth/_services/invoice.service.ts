import { Injectable } from '@angular/core';
import { Invoice } from '../_models/invoice.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpUtilsService } from '../../_base/crud';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';


const API_INVOICE_URL ='http://localhost:3000/api/create-invoice';
const API_INVOICES_URL ='http://localhost:3000/api/invoices';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(public http:HttpClient,
    private httpUtils: HttpUtilsService) { }
  saveInvoice(invoiceForm : FormGroup): Observable<Invoice> {
    const httpHeaders = new HttpHeaders();   httpHeaders.set('Content-Type', 'application/json');
         return this.http.post<Invoice>(API_INVOICE_URL, invoiceForm, { headers: httpHeaders});
     }
     getAllInvoices(): Observable<Invoice[]> {
      return this.http.get<Invoice[]>(API_INVOICES_URL);
    }
    getInvoiceById(invoiceId: number): Observable<Invoice> {
      return this.http.get<Invoice>(API_INVOICES_URL + `/${invoiceId}`);
    }
}


