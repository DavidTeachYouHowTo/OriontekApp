import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import Swal from 'sweetalert2';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css'],
})
export class CompanyEditComponent implements OnInit {
  company: Company;
  companyForm: FormGroup;
  submitted = false;
  id = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.companyForm = this.formBuilder.group({
      ID: 0,
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      isActive: false,
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
            this.router.navigate(['../company']);
          }
        });
        return;
      }

      this.id = params['id'];

      this.companyService.getById(this.id).subscribe(
        (company) => this.loadForm(company),
        (error) =>
          Swal.fire(
            'Error',
            'Error al tratar de obtener los registros. ' + error,
            'error'
          )
      );
    });
  }

  loadForm(company: Company) {
    this.companyForm.patchValue({
      ID: company.id,
      name: company.name,
      isActive: company.isActive,
    });
  }

  get formControl() {
    return this.companyForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.companyForm.invalid) {
      return;
    }

    this.update();
  }

  update() {
    this.companyService.update(this.companyForm.value).subscribe(
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
        this.router.navigate(['../company']);
      }
    });
  }

  backToList() {
    this.companyForm.reset();
    this.router.navigate(['../company']);
  }
}
