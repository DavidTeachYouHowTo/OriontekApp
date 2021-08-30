import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerAddress } from 'src/app/models/customerAddress.model';
import Swal from 'sweetalert2';
import { CustomerService } from '../../customer/customer.service';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css'],
})
export class AddressEditComponent implements OnInit {
  customerAddress: CustomerAddress;
  addressForm: FormGroup;
  submitted = false;
  addressId: number = 0;
  customerId = 0;
  customerName: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private addressService: AddressService,
    private customerService: CustomerService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
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

      this.addressId = params['id'];

      this.addressService.getById(this.addressId).subscribe(
        (response) => {
          this.loadForm(response);
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

  loadForm(customerAddress: CustomerAddress) {
    this.addressForm.patchValue({
      ID: customerAddress.id,
      customerId: customerAddress.customerId,
      country: customerAddress.country,
      city: customerAddress.city,
      address: customerAddress.address,
      countryState: customerAddress.countryState,
      postalCode: customerAddress.postalCode,
      isActive: customerAddress.isActive,
    });

    this.customerId = customerAddress.customerId;
    this.customerName =
      customerAddress.customer.name + ' ' + customerAddress.customer.lastName;
  }

  get formControl() {
    return this.addressForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addressForm.invalid) {
      return;
    }

    this.update();
  }

  update() {
    this.addressService.update(this.addressForm.value).subscribe(
      () => this.onSaveSuccess(),
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
