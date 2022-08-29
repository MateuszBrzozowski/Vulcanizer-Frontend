import { Component, OnInit, Type } from '@angular/core';
import { Services, TypOfServices, WheelType } from 'src/app/model/services';

@Component({
  selector: 'app-service-managment',
  templateUrl: './service-managment.component.html',
  styleUrls: ['./service-managment.component.css'],
})
export class ServiceManagmentComponent implements OnInit {
  tiresSwapChecked: boolean = false;
  wheelSwapChecked: boolean = false;
  wheelBalanceChecked: boolean = false;
  straightRimsChecked: boolean = false;

  tiresSwapAluChecked: boolean = false;
  wheelSwapAluChecked: boolean = false;
  wheelBalanceAluChecked: boolean = false;
  straightRimAluChecked: boolean = false;

  tiresSwapAluSizeChecked: boolean = false;
  wheelSwapAluSizeChecked: boolean = false;
  wheelBalanceAluSizeChecked: boolean = false;
  straightRimAluSizeChecked: boolean = false;

  tiresSwapSteelChecked: boolean = false;
  wheelSwapSteelChecked: boolean = false;
  wheelBalanceSteelChecked: boolean = false;
  straightRimSteelChecked: boolean = false;

  tiresSwapSteelSizeChecked: boolean = false;
  wheelSwapSteelSizeChecked: boolean = false;
  wheelBalanceSteelSizeChecked: boolean = false;
  straightRimSteelSizeChecked: boolean = false;

  messageTiresSwapPriceIsReq: boolean = false;
  messageTiresSwapPriceNotValid: boolean = false;
  messageTiresSwapTimeReq: boolean = false;

  messageTiresSwapAluPriceIsReq: boolean = false;
  messageTiresSwapAluPriceNotValid: boolean = false;
  messageTiresSwapAluTimeReq: boolean = false;

  messageTiresSwapSteelPriceIsReq: boolean = false;
  messageTiresSwapSteelPriceNotValid: boolean = false;
  messageTiresSwapSteelTimeReq: boolean = false;

  messageWheelSwapPriceIsReq: boolean = false;
  messageWheelSwapPriceNotValid: boolean = false;
  messageWheelSwapTimeReq: boolean = false;

  messageWheelSwapAluPriceIsReq: boolean = false;
  messageWheelSwapAluPriceNotValid: boolean = false;
  messageWheelSwapAluTimeReq: boolean = false;

  messageWheelSwapSteelPriceIsReq: boolean = false;
  messageWheelSwapSteelPriceNotValid: boolean = false;
  messageWheelSwapSteelTimeReq: boolean = false;

  messageWheelBalancePriceIsReq: boolean = false;
  messageWheelBalancePriceNotValid: boolean = false;
  messageWheelBalanceTimeReq: boolean = false;

  messageWheelBalanceAluPriceIsReq: boolean = false;
  messageWheelBalanceAluPriceNotValid: boolean = false;
  messageWheelBalanceAluTimeReq: boolean = false;

  messageWheelBalanceSteelPriceIsReq: boolean = false;
  messageWheelBalanceSteelPriceNotValid: boolean = false;
  messageWheelBalanceSteelTimeReq: boolean = false;

  messageStraightRimPriceIsReq: boolean = false;
  messageStraightRimPriceNotValid: boolean = false;
  messageStraightRimTimeReq: boolean = false;

  messageStraightRimAluPriceIsReq: boolean = false;
  messageStraightRimAluPriceNotValid: boolean = false;
  messageStraightRimAluTimeReq: boolean = false;

  messageStraightRimSteelPriceIsReq: boolean = false;
  messageStraightRimSteelPriceNotValid: boolean = false;
  messageStraightRimSteelTimeReq: boolean = false;

  services: Services[] = new Array<Services>();

  tiresSwap: Services = new Services();
  wheelSwap: Services = new Services();
  wheelBalance: Services = new Services();
  straightRim: Services = new Services();

  tiresSwapAlu: Services = new Services();
  wheelSwapAlu: Services = new Services();
  wheelBalanceAlu: Services = new Services();
  straightRimAlu: Services = new Services();

  tiresSwapSteel: Services = new Services();
  wheelSwapSteel: Services = new Services();
  wheelBalanceSteel: Services = new Services();
  straightRimSteel: Services = new Services();

  tiresSwapAluSizeList: Services[] = new Array<Services>();
  wheelSwapAluSizeList: Services[] = new Array<Services>();
  wheelBalanceAluSizeList: Services[] = new Array<Services>();
  straightRimAluSizeList: Services[] = new Array<Services>();

  tiresSwapSteelSizeList: Services[] = new Array<Services>();
  wheelSwapSteelSizeList: Services[] = new Array<Services>();
  wheelBalanceSteelSizeList: Services[] = new Array<Services>();
  straightRimSteelSizeList: Services[] = new Array<Services>();

  customServicesList: Services[] = new Array<Services>();

  constructor() { }

  ngOnInit(): void {
    this.tiresSwapInit();
    this.wheelSwapInit();
    this.wheelBalanceInit();
    this.straightRimsInit();
    this.customServicesInit();
  }

  tiresSwapInit() {
    //pobieranie z BE danych i przypisanie do odpowiednich elementw tutej
    this.tiresSwap.typOfServices = TypOfServices.TIRES_SWAP;
    this.tiresSwapAlu.typOfServices = TypOfServices.TIRES_SWAP;
    this.tiresSwapAlu.wheelType = WheelType.ALUMINIUM;
    this.tiresSwapSteel.typOfServices = TypOfServices.TIRES_SWAP;
    this.tiresSwapSteel.wheelType = WheelType.STEEL;
  }

  wheelSwapInit() {
    //pobieranie z BE danych i przypisanie do odpowiednich elementw tutej
    this.wheelSwap.typOfServices = TypOfServices.WHEEL_SWAP;
    this.wheelSwapAlu.typOfServices = TypOfServices.WHEEL_SWAP;
    this.wheelSwapAlu.wheelType = WheelType.ALUMINIUM;
    this.wheelSwapSteel.typOfServices = TypOfServices.WHEEL_SWAP;
    this.wheelSwapSteel.wheelType = WheelType.STEEL;
  }

  wheelBalanceInit() {
    //pobieranie z BE danych i przypisanie do odpowiednich elementw tutej
    this.wheelBalance.typOfServices = TypOfServices.WHEEL_BALANCE;
    this.wheelBalanceAlu.typOfServices = TypOfServices.WHEEL_BALANCE;
    this.wheelBalanceAlu.wheelType = WheelType.ALUMINIUM;
    this.wheelBalanceSteel.typOfServices = TypOfServices.WHEEL_BALANCE;
    this.wheelBalanceSteel.wheelType = WheelType.STEEL;
  }

  straightRimsInit() {
    //pobieranie z BE danych i przypisanie do odpowiednich elementw tutej
    this.straightRim.typOfServices = TypOfServices.STRAIGHTENING_RIMS;
    this.straightRimAlu.typOfServices = TypOfServices.STRAIGHTENING_RIMS;
    this.straightRimAlu.wheelType = WheelType.ALUMINIUM;
    this.straightRimSteel.typOfServices = TypOfServices.STRAIGHTENING_RIMS;
    this.straightRimSteel.wheelType = WheelType.STEEL;
  }

  customServicesInit() { }

  addCustomServices() {
    const services: Services = new Services();
    services.typOfServices = TypOfServices.CUSTOM;
    services._id = this.customServicesList.length;
    this.customServicesList.push(services);
  }

  setCustomName(_id: number, input: HTMLInputElement) {
    const index = this.getIndexFromSizeList(this.customServicesList, _id);
    this.customServicesList[index].name = input.value;
  }

  setPriceCustom(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.customServicesList);
  }

  setTimeCustom(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.customServicesList);
  }

  addTiresSwapAluSize() {
    const services: Services = new Services();
    services.typOfServices = TypOfServices.TIRES_SWAP;
    services.wheelType = WheelType.ALUMINIUM;
    services._id = this.tiresSwapAluSizeList.length;
    services.price = this.tiresSwapAlu.price;
    services.time = this.tiresSwapAlu.time;
    this.tiresSwapAluSizeList.push(services);
  }

  addTiresSwapSteelSize() {
    const services: Services = new Services();
    services.typOfServices = TypOfServices.TIRES_SWAP;
    services.wheelType = WheelType.STEEL;
    services._id = this.tiresSwapSteelSizeList.length;
    services.price = this.tiresSwapSteel.price;
    services.time = this.tiresSwapSteel.time;
    this.tiresSwapSteelSizeList.push(services);
  }

  addWheelSwapAluSize() {
    const services: Services = new Services();
    services.typOfServices = TypOfServices.WHEEL_SWAP;
    services.wheelType = WheelType.ALUMINIUM;
    services._id = this.wheelSwapAluSizeList.length;
    services.price = this.wheelSwapAlu.price;
    services.time = this.wheelSwapAlu.time;
    this.wheelSwapAluSizeList.push(services);
  }

  addWheelSwapSteelSize() {
    const services: Services = new Services();
    services.typOfServices = TypOfServices.WHEEL_SWAP;
    services.wheelType = WheelType.STEEL;
    services._id = this.wheelSwapSteelSizeList.length;
    services.price = this.wheelSwapSteel.price;
    services.time = this.wheelSwapSteel.time;
    this.wheelSwapSteelSizeList.push(services);
  }

  addWheelBalanceAluSize() {
    const services: Services = new Services();
    services.typOfServices = TypOfServices.WHEEL_BALANCE;
    services.wheelType = WheelType.ALUMINIUM;
    services._id = this.wheelBalanceAluSizeList.length;
    services.price = this.wheelBalanceAlu.price;
    services.time = this.wheelBalanceAlu.time;
    this.wheelBalanceAluSizeList.push(services);
  }

  addWheelBalanceSteelSize() {
    const services: Services = new Services();
    services.typOfServices = TypOfServices.WHEEL_BALANCE;
    services.wheelType = WheelType.STEEL;
    services._id = this.wheelBalanceSteelSizeList.length;
    services.price = this.wheelBalanceSteel.price;
    services.time = this.wheelBalanceSteel.time;
    this.wheelBalanceSteelSizeList.push(services);
  }

  addStraightRimAluSize() {
    const services: Services = new Services();
    services.typOfServices = TypOfServices.STRAIGHTENING_RIMS;
    services.wheelType = WheelType.ALUMINIUM;
    services._id = this.straightRimAluSizeList.length;
    services.price = this.straightRimAlu.price;
    services.time = this.straightRimAlu.time;
    this.straightRimAluSizeList.push(services);
  }

  addStraightRimSteelSize() {
    const services: Services = new Services();
    services.typOfServices = TypOfServices.STRAIGHTENING_RIMS;
    services.wheelType = WheelType.STEEL;
    services._id = this.straightRimSteelSizeList.length;
    services.price = this.straightRimSteel.price;
    services.time = this.straightRimSteel.time;
    this.straightRimSteelSizeList.push(services);
  }

  getIndexFromSizeList(list: Services[], searchId: number | null): number {
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      if (element._id == searchId) {
        return i;
      }
    }
    return -1;
  }

  removeTiresSwapAluSize(service: Services) {
    this.removeTiresSwapSize(service, this.tiresSwapAluSizeList);
  }

  removeWheelSwapAluSize(service: Services) {
    this.removeTiresSwapSize(service, this.wheelSwapAluSizeList);
  }

  removeWheelBalanceAluSize(service: Services) {
    this.removeTiresSwapSize(service, this.wheelBalanceAluSizeList);
  }

  removeStraightRimAluSize(service: Services) {
    this.removeTiresSwapSize(service, this.straightRimAluSizeList);
  }

  removeTiresSwapSteelSize(service: Services) {
    this.removeTiresSwapSize(service, this.tiresSwapSteelSizeList);
  }

  removeWheelSwapSteelSize(service: Services) {
    this.removeTiresSwapSize(service, this.wheelSwapSteelSizeList);
  }

  removeWheelBalanceSteelSize(service: Services) {
    this.removeTiresSwapSize(service, this.wheelBalanceSteelSizeList);
  }

  removeStraightRimSteelSize(service: Services) {
    this.removeTiresSwapSize(service, this.straightRimSteelSizeList);
  }

  removeCustomServices(service: Services) {
    this.removeTiresSwapSize(service, this.customServicesList);
  }

  removeTiresSwapSize(service: Services, list: Services[]) {
    const index = this.getIndexFromSizeList(list, service._id);
    list.splice(index, 1);
  }

  setPrice(input: HTMLInputElement, service: Services) {
    service.price = input.value;
    if (input.value.length > 0) {
      service.price = input.value;
    } else {
      service.price = null;
    }
  }

  setPriceTiresSwap(input: HTMLInputElement) {
    this.setPrice(input, this.tiresSwap);
    if (this.tiresSwap.price == null) {
      this.messageTiresSwapPriceIsReq = true;
    } else {
      this.messageTiresSwapPriceIsReq = false;
    }
    const _price : number = +this.tiresSwap.price!;
    if (isNaN(_price)) {
      this.messageTiresSwapPriceNotValid = true;
    } else {
      this.messageTiresSwapPriceNotValid = false;
    }
  }

  setPriceTiresSwapAlu(input: HTMLInputElement) {
    this.setPrice(input, this.tiresSwapAlu);
    if (this.tiresSwapAlu.price == null) {
      this.messageTiresSwapAluPriceIsReq = true;
    } else {
      this.messageTiresSwapAluPriceIsReq = false;
    }
    const _price : number = +this.tiresSwapAlu.price!;
    if (isNaN(_price)) {
      this.messageTiresSwapAluPriceNotValid = true;
    } else {
      this.messageTiresSwapAluPriceNotValid = false;
    }
  }

  setPriceTiresSwapSteel(input: HTMLInputElement) {
    this.setPrice(input, this.tiresSwapSteel);
    if (this.tiresSwapSteel.price == null) {
      this.messageTiresSwapSteelPriceIsReq = true;
    } else {
      this.messageTiresSwapSteelPriceIsReq = false;
    }
    const _price : number = +this.tiresSwapSteel.price!;
    if (isNaN(_price)) {
      this.messageTiresSwapSteelPriceNotValid = true;
    } else {
      this.messageTiresSwapSteelPriceNotValid = false;
    }
  }

  setPriceWheelSwap(input: HTMLInputElement) {
    this.setPrice(input, this.wheelSwap);
    if (this.wheelSwap.price == null) {
      this.messageWheelSwapPriceIsReq = true;
    } else {
      this.messageWheelSwapPriceIsReq = false;
    }
    const _price : number = +this.wheelSwap.price!;
    if (isNaN(_price)) {
      this.messageWheelSwapPriceNotValid = true;
    } else {
      this.messageWheelSwapPriceNotValid = false;
    }
  }

  setPriceWheelSwapAlu(input: HTMLInputElement) {
    this.setPrice(input, this.wheelSwapAlu);
    if (this.wheelSwapAlu.price == null) {
      this.messageWheelSwapAluPriceIsReq = true;
    } else {
      this.messageWheelSwapAluPriceIsReq = false;
    }
    const _price : number = +this.wheelSwapAlu.price!;
    if (isNaN(_price)) {
      this.messageWheelSwapAluPriceNotValid = true;
    } else {
      this.messageWheelSwapAluPriceNotValid = false;
    }
  }

  setPriceWheelSwapSteel(input: HTMLInputElement) {
    this.setPrice(input, this.wheelSwapSteel);
    if (this.wheelSwapSteel.price == null) {
      this.messageWheelSwapSteelPriceIsReq = true;
    } else {
      this.messageWheelSwapSteelPriceIsReq = false;
    }
    const _price : number = +this.wheelSwapSteel.price!;
    if (isNaN(_price)) {
      this.messageWheelSwapSteelPriceNotValid = true;
    } else {
      this.messageWheelSwapSteelPriceNotValid = false;
    }
  }

  setPriceWheelBalance(input: HTMLInputElement) {
    this.setPrice(input, this.wheelBalance);
    if (this.wheelBalance.price == null) {
      this.messageWheelBalancePriceIsReq = true;
    } else {
      this.messageWheelBalancePriceIsReq = false;
    }
    const _price : number = +this.wheelBalance.price!;
    if (isNaN(_price)) {
      this.messageWheelBalancePriceNotValid = true;
    } else {
      this.messageWheelBalancePriceNotValid = false;
    }
  }

  setPriceStraightRim(input: HTMLInputElement) {
    this.setPrice(input, this.straightRim);
    if (this.straightRim.price == null) {
      this.messageStraightRimPriceIsReq = true;
    } else {
      this.messageStraightRimPriceIsReq = false;
    }
    const _price : number = +this.straightRim.price!;
    if (isNaN(_price)) {
      this.messageStraightRimPriceNotValid = true;
    } else {
      this.messageStraightRimPriceNotValid = false;
    }
  }

  setPriceWheelBalanceAlu(input: HTMLInputElement) {
    this.setPrice(input, this.wheelBalanceAlu);
    if (this.wheelBalanceAlu.price == null) {
      this.messageWheelBalanceAluPriceIsReq = true;
    } else {
      this.messageWheelBalanceAluPriceIsReq = false;
    }
    const _price : number = +this.wheelBalanceAlu.price!;
    if (isNaN(_price)) {
      this.messageWheelBalanceAluPriceNotValid = true;
    } else {
      this.messageWheelBalanceAluPriceNotValid = false;
    }
  }

  setPriceWheelBalanceSteel(input: HTMLInputElement) {
    this.setPrice(input, this.wheelBalanceSteel);
    if (this.wheelBalanceSteel.price == null) {
      this.messageWheelBalanceSteelPriceIsReq = true;
    } else {
      this.messageWheelBalanceSteelPriceIsReq = false;
    }
    const _price : number = +this.wheelBalanceSteel.price!;
    if (isNaN(_price)) {
      this.messageWheelBalanceSteelPriceNotValid = true;
    } else {
      this.messageWheelBalanceSteelPriceNotValid = false;
    }
  }

  setPriceStraightRimAlu(input: HTMLInputElement) {
    this.setPrice(input, this.straightRimAlu);
    if (this.straightRimAlu.price == null) {
      this.messageStraightRimAluPriceIsReq = true;
    } else {
      this.messageStraightRimAluPriceIsReq = false;
    }
    const _price : number = +this.straightRimAlu.price!;
    if (isNaN(_price)) {
      this.messageStraightRimAluPriceNotValid = true;
    } else {
      this.messageStraightRimAluPriceNotValid = false;
    }
  }

  setPriceStraightRimSteel(input: HTMLInputElement) {
    this.setPrice(input, this.straightRimSteel);
    if (this.straightRimSteel.price == null) {
      this.messageStraightRimSteelPriceIsReq = true;
    } else {
      this.messageStraightRimSteelPriceIsReq = false;
    }
    const _price : number = +this.straightRimSteel.price!;
    if (isNaN(_price)) {
      this.messageStraightRimSteelPriceNotValid = true;
    } else {
      this.messageStraightRimSteelPriceNotValid = false;
    }
  }

  setTime(input: HTMLInputElement, service: Services): boolean {
    if (input.value.length == 5) {
      service.time = input.value.slice(0, 2) + ':' + input.value.slice(3, 5);
      if (service.time === '00:00') {
        service.time = null;
        return true;
      } else {
        return false;
      }
    } else {
      service.time = null;
      return true;
    }
  }

  setTimeTiresSwap(input: HTMLInputElement) {
    if (this.setTime(input, this.tiresSwap)) {
      this.messageTiresSwapTimeReq = true;
    } else {
      this.messageTiresSwapTimeReq = false;
    }
  }

  setTimeTiresSwapAlu(input: HTMLInputElement) {
    if (this.setTime(input, this.tiresSwapAlu)) {
      this.messageTiresSwapAluTimeReq = true;
    } else {
      this.messageTiresSwapAluTimeReq = false;
    }
  }

  setTimeTiresSwapSteel(input: HTMLInputElement) {
    if (this.setTime(input, this.tiresSwapSteel)) {
      this.messageTiresSwapSteelTimeReq = true;
    } else {
      this.messageTiresSwapSteelTimeReq = false;
    }
  }

  setTimeWheelSwap(input: HTMLInputElement) {
    if (this.setTime(input, this.wheelSwap)) {
      this.messageWheelSwapTimeReq = true;
    } else {
      this.messageWheelSwapTimeReq = false;
    }
  }

  setTimeWheelSwapAlu(input: HTMLInputElement) {
    if (this.setTime(input, this.wheelSwapAlu)) {
      this.messageWheelSwapAluTimeReq = true;
    } else {
      this.messageWheelSwapAluTimeReq = false;
    }
  }

  setTimeWheelSwapSteel(input: HTMLInputElement) {
    if (this.setTime(input, this.wheelSwapSteel)) {
      this.messageWheelSwapSteelTimeReq = true;
    } else {
      this.messageWheelSwapSteelTimeReq = false;
    }
  }

  setTimeWheelBalance(input: HTMLInputElement) {
    if (this.setTime(input, this.wheelBalance)) {
      this.messageWheelBalanceTimeReq = true;
    } else {
      this.messageWheelBalanceTimeReq = false;
    }
  }

  setTimeStraightRim(input: HTMLInputElement) {
    if (this.setTime(input, this.straightRim)) {
      this.messageStraightRimTimeReq = true;
    } else {
      this.messageStraightRimTimeReq = false;
    }
  }

  setTimeWheelBalanceAlu(input: HTMLInputElement) {
    if (this.setTime(input, this.wheelBalanceAlu)) {
      this.messageWheelBalanceAluTimeReq = true;
    } else {
      this.messageWheelBalanceAluTimeReq = false;
    }
  }

  setTimeWheelBalanceSteel(input: HTMLInputElement) {
    if (this.setTime(input, this.wheelBalanceSteel)) {
      this.messageWheelBalanceSteelTimeReq = true;
    } else {
      this.messageWheelBalanceSteelTimeReq = false;
    }
  }

  setTimeStraightRimAlu(input: HTMLInputElement) {
    if (this.setTime(input, this.straightRimAlu)) {
      this.messageStraightRimAluTimeReq = true;
    } else {
      this.messageStraightRimAluTimeReq = false;
    }
  }

  setTimeStraightRimSteel(input: HTMLInputElement) {
    if (this.setTime(input, this.straightRimSteel)) {
      this.messageStraightRimSteelTimeReq = true;
    } else {
      this.messageStraightRimSteelTimeReq = false;
    }
  }

  setPriceAluSize(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.tiresSwapAluSizeList);
  }

  setPriceAluSizeWheelSwap(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.wheelSwapAluSizeList);
  }

  setPriceAluSizeWheelBalance(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.wheelBalanceAluSizeList);
  }

  setPriceAluSizeStraightRim(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.straightRimAluSizeList);
  }

  setPriceSteelSize(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.tiresSwapSteelSizeList);
  }

  setPriceSteelSizeWheelSwap(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.wheelSwapSteelSizeList);
  }

  setPriceSteelSizeWheelBalance(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.wheelBalanceSteelSizeList);
  }

  setPriceSteelSizeStraightRim(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.straightRimSteelSizeList);
  }

  setPriceSize(_id: number, input: HTMLInputElement, list: Services[]) {
    const index = this.getIndexFromSizeList(list, _id);
    if (input.value.length > 0) {
      list[index].price = input.value;
    } else {
      list[index].price = null;
    }

    if (list[index].price == null) {
      list[index].messagePriceIsReq = true;
    } else {
      list[index].messagePriceIsReq = false;
    }

    const _price : number = +list[index].price!;

    if (isNaN(_price)) {
      list[index].messagePriceNotValid = true;
    } else {
      list[index].messagePriceNotValid = false;
    }
  }

  setSteelSize(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement
  ) {
    this.setSize(_id, inputFrom, inputTo, this.tiresSwapSteelSizeList);
  }

  setSteelSizeWheelSwap(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement
  ) {
    this.setSize(_id, inputFrom, inputTo, this.wheelSwapSteelSizeList);
  }

  setSteelSizeWheelBalance(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement
  ) {
    this.setSize(_id, inputFrom, inputTo, this.wheelBalanceSteelSizeList);
  }

  setSteelSizeStraightRim(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement
  ) {
    this.setSize(_id, inputFrom, inputTo, this.straightRimSteelSizeList);
  }

  setAluSize(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement
  ) {
    this.setSize(_id, inputFrom, inputTo, this.tiresSwapAluSizeList);
  }

  setAluSizeWheelSwap(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement
  ) {
    this.setSize(_id, inputFrom, inputTo, this.wheelSwapAluSizeList);
  }

  setAluSizeWheelBalance(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement
  ) {
    this.setSize(_id, inputFrom, inputTo, this.wheelBalanceAluSizeList);
  }

  setAluSizeStraightRim(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement
  ) {
    this.setSize(_id, inputFrom, inputTo, this.straightRimAluSizeList);
  }

  setSize(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement,
    list: Services[]
  ) {
    const index = this.getIndexFromSizeList(list, _id);
    if (inputFrom.value.length > 0) {
      list[index].sizeTo = +inputFrom.value;
    } else {
      list[index].sizeTo = null;
    }
    if (inputTo.value.length > 0) {
      list[index].sizeFrom = +inputTo.value;
    } else {
      list[index].sizeFrom = null;
    }

    const sizeTo = list[index].sizeTo;
    const sizeFrom = list[index].sizeFrom;

    if (
      sizeTo == null ||
      isNaN(sizeTo) ||
      sizeFrom == null ||
      isNaN(sizeFrom)
    ) {
      list[index].messageSizeNotValid = true;
      return;
    } else {
      if (sizeTo < sizeFrom) {
        list[index].messageSizeNotValid = true;
        return;
      } else {
        list[index].messageSizeNotValid = false;
      }

      for (let i = 0; i < list.length - 1; i++) {
        const elementI = list[i];
        for (let j = i + 1; j < list.length; j++) {
          const elementJ = list[j];
          if (
            elementI.sizeFrom != null &&
            elementI.sizeTo != null &&
            elementJ.sizeFrom != null &&
            elementJ.sizeTo != null
          ) {
            if (elementJ.sizeFrom > elementI.sizeFrom) {
              if (elementJ.sizeFrom <= elementI.sizeTo) {
                elementI.messageSizeIsExist = true;
                elementJ.messageSizeIsExist = true;
                return;
              } else {
                elementI.messageSizeIsExist = false;
                elementJ.messageSizeIsExist = false;
              }
            } else if (elementJ.sizeFrom < elementI.sizeFrom) {
              if (elementJ.sizeTo >= elementI.sizeFrom) {
                elementI.messageSizeIsExist = true;
                elementJ.messageSizeIsExist = true;
                return;
              } else {
                elementI.messageSizeIsExist = false;
                elementJ.messageSizeIsExist = false;
              }
            } else if (elementJ.sizeFrom == elementI.sizeFrom) {
              elementI.messageSizeIsExist = true;
              elementJ.messageSizeIsExist = true;
              return;
            }
          }
        }
      }
    }
  }

  setAluSizeTime(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.tiresSwapAluSizeList);
  }

  setAluSizeTimeWheelSwap(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.wheelSwapAluSizeList);
  }

  setAluSizeTimeWheelBalance(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.wheelBalanceAluSizeList);
  }

  setAluSizeTimeStraightRim(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.straightRimAluSizeList);
  }

  setSteelSizeTime(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.tiresSwapSteelSizeList);
  }

  setSteelSizeTimeWheelSwap(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.wheelSwapSteelSizeList);
  }

  setSteelSizeTimeWheelBalance(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.wheelBalanceSteelSizeList);
  }

  setSteelSizeTimeStraightRim(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.straightRimSteelSizeList);
  }

  setSizeTime(_id: number, input: HTMLInputElement, list: Services[]) {
    const index = this.getIndexFromSizeList(list, _id);
    if (input.value.length == 5) {
      list[index].time =
        input.value.slice(0, 2) + ':' + input.value.slice(3, 5);
      list[index].messageSizeTimeReq = false;
    } else {
      list[index].messageSizeTimeReq = true;
    }
  }
}
