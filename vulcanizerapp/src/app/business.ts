import { Address } from "./address";

export interface Business {
  id: number;
  name: string;
  nip: number;
  createdDate: String;
  description: string;
  status: string;
  address: Address;
  photo: string;
}
