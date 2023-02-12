import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url = `${environment.apiUrl}`

  constructor(private _http: HttpClient) { }
  
  // add address
  addAddress (data: any): Observable<any>{
    return this._http.post(`${this.url}/addresses`, data)
  }

  // get address
  getAddress(): Observable<any>{
    return this._http.get(`${this.url}/addresses`)
  }

  // delete address
  deleteAddress(id: number): Observable<any>{
    return this._http.delete(`${this.url}/addresses/${id}`)
  }

  // update address
  updateAddress(id: number, data: any): Observable<any>{
    return this._http.put(`${this.url}/addresses/${id}`, data)
  }
}
