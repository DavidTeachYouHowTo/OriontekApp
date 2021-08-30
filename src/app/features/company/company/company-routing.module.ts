import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyCreateComponent } from '../company-create/company-create.component';
import { CompanyEditComponent } from '../company-edit/company-edit.component';
import { CompanyListComponent } from '../company-list/company-list.component';

const routes: Routes = [
  { path: '', component: CompanyListComponent },
  { path: 'create', component: CompanyCreateComponent },
  { path: 'edit/:id', component: CompanyEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
