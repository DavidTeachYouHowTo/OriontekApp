import { Company } from './company.model';

export interface Customer {
  id: number;
  companyId: number;
  name: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  company: Company;
  isActive: boolean;
}
