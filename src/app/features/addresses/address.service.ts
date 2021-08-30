import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerAddress } from 'src/app/models/customerAddress.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getAllByCustomerId(customerId: number): Observable<CustomerAddress[]> {
    return this.http.get<CustomerAddress[]>(
      environment.apiUrl +
        'customerAddress/GetAllByCustomerId?customerId=' +
        customerId
    );
  }

  getById(id: number): Observable<CustomerAddress> {
    return this.http.get<CustomerAddress>(
      environment.apiUrl + 'customerAddress/GetById/' + id
    );
  }

  create(ocupation: CustomerAddress): Observable<CustomerAddress> {
    return this.http.post<CustomerAddress>(
      environment.apiUrl + 'customerAddress/create',
      ocupation
    );
  }

  update(ocupation: CustomerAddress): Observable<CustomerAddress> {
    return this.http.put<CustomerAddress>(
      environment.apiUrl + 'customerAddress/update',
      ocupation
    );
  }

  delete(id: number) {
    return this.http.delete<CustomerAddress>(
      environment.apiUrl + 'CustomerAddress/delete/' + id
    );
  }
}
