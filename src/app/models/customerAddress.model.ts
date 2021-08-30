import { Customer } from './customer.model';

export interface CustomerAddress {
  id: number;
  customerId: number;
  country: string;
  city: string;
  address: string;
  countryState: string;
  postalCode: string;
  customer: Customer;
  isActive: boolean;
}
