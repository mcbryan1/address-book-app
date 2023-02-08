import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _http: HttpClient) { }

  // add address
  addAddress (data: any): Observable<any>{
    return this._http.post('http://localhost:3000/addresses', data)
  }

  // get address
  getAddress(): Observable<any>{
    return this._http.get('http://localhost:3000/addresses')
  }

  // delete address
  deleteAddress(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/addresses/${id}`)
  }
}
