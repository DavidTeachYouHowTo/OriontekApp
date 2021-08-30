import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(environment.apiUrl + 'customer/GetAll');
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(
      environment.apiUrl + 'customer/GetById/' + id
    );
  }

  create(ocupation: Customer): Observable<Customer> {
    return this.http.post<Customer>(
      environment.apiUrl + 'customer/create',
      ocupation
    );
  }

  update(ocupation: Customer): Observable<Customer> {
    return this.http.put<Customer>(
      environment.apiUrl + 'customer/update',
      ocupation
    );
  }
}
