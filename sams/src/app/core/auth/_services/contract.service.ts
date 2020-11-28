import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpUtilsService } from '../../_base/crud';
import { Contract } from '../_models/contract.model';
const API_CONTRACT_URL = 'http://localhost:3000/api/create-contract';
const API_CONTRACTS_URL = 'http://localhost:3000/api/contracts';
@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  constructor(public http: HttpClient,
    private httpUtils: HttpUtilsService) { }
  saveContract(contract: Contract): Observable<Contract> {
    const httpHeaders = new HttpHeaders(); httpHeaders.set('Content-Type', 'application/json');
    return this.http.post<Contract>(API_CONTRACT_URL, contract, {
      headers: httpHeaders,
    });
  }
  getAllContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(API_CONTRACTS_URL);
  }
  deleteContract(contractId: number) {
		const url = `${API_CONTRACTS_URL}/${contractId}`;
		return this.http.delete<Contract>(url);
    }
  approvedContract(contract: Contract): Observable<any> {
  const httpHeaders = new HttpHeaders();
  httpHeaders.set('Content-Type', 'application/json');
    return this.http.put(API_CONTRACTS_URL, contract, { headers: httpHeaders });
  }
  updateContract(contract: Contract): Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.set('Content-Type', 'application/json');
      return this.http.put(API_CONTRACTS_URL, contract, { headers: httpHeaders });
}
  getContractById(contractId: number): Observable<Contract> {
    return this.http.get<Contract>(API_CONTRACTS_URL + `/${contractId}`);
  }
    // here we set/change value of the observable
    setData(clientApiData) {
      this.apiData.next(clientApiData)
      }
}
