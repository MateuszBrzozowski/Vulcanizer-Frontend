import { Time } from '@angular/common';

export class Services {
    id: string | null = null;
    _id: number | null = null;
    price: number | null = null;
    time: Time | null = null;
    typOfServices: TypOfServices | null = null;
    wheelType: WheelType | null = null;
    sizeFrom: number | null = null;
    sizeTo: number | null = null;
    messagePriceNotValid : boolean = false;
    messagePriceIsReq : boolean = false;
    messageSizeNotValid : boolean = false;
    messageSizeTimeReq : boolean = false;
}

export enum TypOfServices {
    TIRES_SWAP,
    WHEEL_SWAP,
    WHEEL_BALANCE,
    STRAIGHTENING_RIMS,
    CUSTOM,
}

export enum WheelType {
    ALUMINIUM,
    STEEL,
}
