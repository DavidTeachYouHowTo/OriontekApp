import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import Swal from 'sweetalert2';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] | undefined;
  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getAll().subscribe(
      (response) => (this.customers = response),
      (err) => {
        Swal.fire('Error', err.error.errors[0].message, 'error');
      }
    ),
      () => console.log(this.customers);
  }
}
