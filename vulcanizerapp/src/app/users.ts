import { Address } from "./address";


export class User {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: string = '';
  birthDate: string = '';
  gender: string = '';
  address: Address = new Address();

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
