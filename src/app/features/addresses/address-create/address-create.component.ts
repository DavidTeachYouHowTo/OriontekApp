import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAddress } from 'src/app/models/customerAddress.model';
import Swal from 'sweetalert2';
import { CustomerService } from '../../customer/customer.service';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css'],
})
export class AddressCreateComponent implements OnInit {
  addressForm: FormGroup;
  submitted = false;
  customerId: number = 0;
  customerName: string | undefined;

  constructor(
    private addressService: AddressService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      ID: 0,
      customerId: [0, Validators.required],
      country: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      city: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      address: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(150)]),
      ],
      countryState: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      postalCode: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      isActive: true,
    });

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
            this.router.navigate(['../address/list/' + this.customerId]);
          }
        });
        return;
      }

      this.customerId = parseInt(params['id']);

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
  }

  get formControl() {
    return this.addressForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addressForm.invalid) {
      return;
    }

    this.create();
  }

  create() {
    let address: CustomerAddress = Object.assign({}, this.addressForm.value);
    address.customerId = this.customerId;
    debugger;
    this.addressService.create(address).subscribe(
      () => {
        this.onSaveSuccess();
      },
      (err) => {
        Swal.fire('Error', err.error.errors[0].message, 'error');
      }
    );
  }

  onSaveSuccess() {
    Swal.fire({
      title: '',
      text: 'Registro guardado correctamente.',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok!',
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['../address/list/' + this.customerId]);
      }
    });
  }

  backToList() {
    this.addressForm.reset();
    this.router.navigate(['../address/list/' + this.customerId]);
  }
}
