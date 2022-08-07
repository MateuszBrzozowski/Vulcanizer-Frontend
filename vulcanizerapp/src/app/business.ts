import { Address } from "./address";

export interface Business {
  id: number;
  name: string;
  displayName: string;
  nip: string;
  createdDate: string;
  description: string;
  status: string;
  address: Address;
  photo: string;
}
