import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './commons_components/footer/footer.component';
import { HomeComponent } from './commons_components/home/home.component';
import { MenuComponent } from './commons_components/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerListComponent } from './features/customer/customer-list/customer-list.component';
import { CustomerCreateComponent } from './features/customer/customer-create/customer-create.component';
import { CustomerEditComponent } from './features/customer/customer-edit/customer-edit.component';
import { AddressListComponent } from './features/addresses/address-list/address-list.component';
import { AddressCreateComponent } from './features/addresses/address-create/address-create.component';
import { AddressEditComponent } from './features/addresses/address-edit/address-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    MenuComponent,
    CustomerListComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    AddressListComponent,
    AddressCreateComponent,
    AddressEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
