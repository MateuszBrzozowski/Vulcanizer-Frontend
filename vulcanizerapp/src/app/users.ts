import { FormGroup } from "@angular/forms";

export interface User{
    id: number;
    firstName : string;
    lastName : string;
    email : string;
    password: string;
    gender : string;
    birthDate : Date
}
