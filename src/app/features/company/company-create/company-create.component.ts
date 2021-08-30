import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company.model';
import Swal from 'sweetalert2';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css'],
})
export class CompanyCreateComponent implements OnInit {
  companyForm: FormGroup;
  submitted = false;

  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companyForm = this.formBuilder.group({
      ID: 0,
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
      ],
      isActive: true,
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

    this.create();
  }

  create() {
    let company: Company = Object.assign({}, this.companyForm.value);

    this.companyService.create(company).subscribe(
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
        this.router.navigate(['../company']);
      }
    });
  }

  backToList() {
    this.companyForm.reset();
    this.router.navigate(['../company']);
  }
}
