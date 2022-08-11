import { Address } from './address';

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
