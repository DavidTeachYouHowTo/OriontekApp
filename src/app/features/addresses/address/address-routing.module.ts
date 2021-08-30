import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressCreateComponent } from '../address-create/address-create.component';
import { AddressEditComponent } from '../address-edit/address-edit.component';
import { AddressListComponent } from '../address-list/address-list.component';

const routes: Routes = [
  { path: 'list/:id', component: AddressListComponent },
  { path: 'create/:id', component: AddressCreateComponent },
  { path: 'edit/:id', component: AddressEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressRoutingModule {}
