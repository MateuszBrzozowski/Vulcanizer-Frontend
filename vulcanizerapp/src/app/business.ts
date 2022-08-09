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

export class UserBusiness {
  noId: number = 1;
  position: string = '';
  businessId: string = '';
  businessName: string = '';
  businessStatus: string = '';
  statusClass: string = '';
  isPanelDisable: boolean = true;
}
