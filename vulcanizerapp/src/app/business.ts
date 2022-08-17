import { Address } from './address';
import { User } from './users';

export interface Business {
  id: number;
  name: string;
  displayName: string;
  nip: string;
  status: string;
  createdDate: string;
  description: string;
  address: Address;
  photo: string;
}

export class UserCompanyBranch {
  noId: number = 1;
  position: string = '';
  companyId: string = '';
  companyBranchId: string = '';
  companyBranchName: string = '';
  companyBranchStatus: string = '';
  statusClass: string = '';
  isPanelDisable: boolean = true;
}

export class UserCompany {
  noId: number = 1;
  id: number = -1;
  nip: string = 'Nip';
  name: string = 'Nazwa';
  address: Address = new Address();
  phone: string = '';
}

export class CompanyBranchResponse {
  noId: number = 1;
  id: string = '';
  name: string = '';
  description: string = '';
  address: Address = new Address();
  createdDate: string = '';
  phone: string = '';
  companyBranchSize: number = 0;
  company: UserCompany = new UserCompany();
  user: User = new User('', '', '');
  companyBranchStatus : string ='Czeka';
  statusClass : string = '';
  isPanelDisable: boolean = true;
}

export class Stand {
  id : number = -1;
  number : number = -1;
}
