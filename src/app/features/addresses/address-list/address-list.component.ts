import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { CustomerAddress } from 'src/app/models/customerAddress.model';
import Swal from 'sweetalert2';
import { CustomerService } from '../../customer/customer.service';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css'],
})
export class AddressListComponent implements OnInit {
  customerAddress: CustomerAddress[] | undefined;
  customerName: string | undefined;
  customerId: number = 0;

  constructor(
    private addressService: AddressService,
    private customerService: CustomerService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params['id'] == undefined || params['id'] == 0) {
        Swal.fire({
          title: '',
          text: 'Parametro no definido.',
          icon: 'error',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok!',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['../customer']);
          }
        });
        return;
      }

      this.customerId = params['id'];

      this.customerService.getById(this.customerId).subscribe(
        (customer) => {
          this.customerName = customer.name + ' ' + customer.lastName;
        },
        (error) =>
          Swal.fire(
            'Error',
            'Error al tratar de obtener los registros. ' + error,
            'error'
          )
      );
    });

    this.getAllByCustomerId(this.customerId);
  }

  getAllByCustomerId(customerId: number) {
    this.addressService.getAllByCustomerId(customerId).subscribe(
      (response) => (this.customerAddress = response),
      (err) => {
        Swal.fire('Error', err.error.errors[0].message, 'error');
      }
    );
  }

  removeAddress(id: number) {
    Swal.fire({
      title: '¿Desea eliminar el registro especificado?',
      text: 'Esta acción no podrá ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminarlo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.addressService.delete(id).subscribe(
          () => {
            Swal.fire({
              title: '',
              text: 'Registro eliminado correctamente.',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok!',
            }).then((result) => {
              if (result.value) {
                this.getAllByCustomerId(this.customerId);
              }
            });
          },
          (error) => console.error(error)
        );
      }
    });
  }

  backToList() {
    this.router.navigate(['../customer']);
  }
}
