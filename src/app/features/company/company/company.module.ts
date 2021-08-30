import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyListComponent } from '../company-list/company-list.component';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { CompanyEditComponent } from '../company-edit/company-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyCreateComponent,
    CompanyEditComponent,
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class CompanyModule {}
