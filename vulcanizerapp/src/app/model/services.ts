import { Time } from '@angular/common';

export class Services {
    id: string | null = null;
    _id: number | null = null;
    name : string | null = null;
    price: string | null = null;
    time: string | null = null;
    typOfServices: TypOfServices | null = null;
    wheelType: WheelType | null = null;
    sizeFrom: number | null = null;
    sizeTo: number | null = null;
    messagePriceNotValid : boolean = false;
    messagePriceIsReq : boolean = false;
    messageSizeNotValid : boolean = false;
    messageSizeTimeReq : boolean = false;
    messageSizeIsExist : boolean = false;
}

export enum TypOfServices {
    TIRES_SWAP = "TIRES_SWAP",
    WHEEL_SWAP = "WHEEL_SWAP",
    WHEEL_BALANCE = "WHEEL_BALANCE",
    STRAIGHTENING_RIMS = "STRAIGHTENING_RIMS",
    CUSTOM = "CUSTOM",
}

export enum WheelType {
    ALUMINIUM = "ALUMINIUM",
    STEEL = "STEEL",
}
