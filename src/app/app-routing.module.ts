import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './commons_components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'company',
    loadChildren: () =>
      import('../app/features/company/company/company.module').then(
        (m) => m.CompanyModule
      ),
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('../app/features/customer/customer/customer.module').then(
        (m) => m.CustomerModule
      ),
  },
  {
    path: 'address',
    loadChildren: () =>
      import('../app/features/addresses/address/address.module').then(
        (m) => m.AddressModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
