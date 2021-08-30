import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company.model';
import Swal from 'sweetalert2';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  companies: Company[] | undefined;
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getAll().subscribe(
      (response) => (this.companies = response),
      (err) => {
        Swal.fire('Error', err.error.errors[0].message, 'error');
      }
    ),
      () => console.log(this.companies);
  }
}
