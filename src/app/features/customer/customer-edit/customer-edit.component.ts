import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import { Customer } from 'src/app/models/customer.model';
import Swal from 'sweetalert2';
import { CompanyService } from '../../company/company.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customer: Customer;
  companies: Company[] | undefined;
  customerForm: FormGroup;
  submitted = false;
  id = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private companyService: CompanyService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      ID: 0,
      companyId:['', Validators.required],
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      lastName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      phoneNumber: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(14)]),
      ],
      email: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(100)]),
      ],
      isActive: true,
    });

    this.getCompanies();

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

      this.id = params['id'];

      this.customerService.getById(this.id).subscribe(
        (customer) => this.loadForm(customer),
        (error) =>
          Swal.fire(
            'Error',
            'Error al tratar de obtener los registros. ' + error,
            'error'
          )
      );
    });
  }

  getCompanies(){
    this.companyService.getAllActive().subscribe(
      (response) => (this.companies = response),
      (err) => {
        Swal.fire('Error', err.error.errors[0].message, 'error');
      }
    ),
      () => console.log(this.companies);
  }

  loadForm(customer: Customer) {
    this.customerForm.patchValue({
      ID: customer.id,
      companyId: customer.companyId,
      name: customer.name,
      lastName: customer.lastName,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
      isActive: customer.isActive,
    });
  }

  get formControl() {
    return this.customerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.customerForm.invalid) {
      return;
    }

    this.update();
  }

  update() {
    this.customerService.update(this.customerForm.value).subscribe(
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
        this.router.navigate(['../customer']);
      }
    });
  }

  backToList() {
    this.customerForm.reset();
    this.router.navigate(['../customer']);
  }
}
