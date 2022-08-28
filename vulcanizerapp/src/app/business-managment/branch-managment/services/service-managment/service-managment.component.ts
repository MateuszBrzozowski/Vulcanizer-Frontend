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
  tiresSwapAluChecked: boolean = false;
  wheelSwapAluChecked: boolean = false;
  wheelBalanceAluChecked: boolean = false;
  tiresSwapAluSizeChecked: boolean = false;
  wheelSwapAluSizeChecked: boolean = false;
  wheelBalanceAluSizeChecked: boolean = false;
  tiresSwapSteelChecked: boolean = false;
  wheelSwapSteelChecked: boolean = false;
  wheelBalanceSteelChecked: boolean = false;
  tiresSwapSteelSizeChecked: boolean = false;
  wheelSwapSteelSizeChecked: boolean = false;
  wheelBalanceSteelSizeChecked: boolean = false;

  straighteningRimsChecked: boolean = false;

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

  services: Services[] = new Array<Services>();

  tiresSwap: Services = new Services();
  wheelSwap: Services = new Services();
  wheelBalance: Services = new Services();
  tiresSwapAlu: Services = new Services();
  wheelSwapAlu: Services = new Services();
  wheelBalanceAlu: Services = new Services();
  tiresSwapSteel: Services = new Services();
  wheelSwapSteel: Services = new Services();
  wheelBalanceSteel: Services = new Services();
  tiresSwapAluSizeList: Services[] = new Array<Services>();
  wheelSwapAluSizeList: Services[] = new Array<Services>();
  wheelBalanceAluSizeList: Services[] = new Array<Services>();
  tiresSwapSteelSizeList: Services[] = new Array<Services>();
  wheelSwapSteelSizeList: Services[] = new Array<Services>();
  wheelBalanceSteelSizeList: Services[] = new Array<Services>();

  constructor() {}

  ngOnInit(): void {
    this.tiresSwapInit();
    this.wheelSwapInit();
    this.wheelBalanceInit();
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

  removeTiresSwapSteelSize(service: Services) {
    this.removeTiresSwapSize(service, this.tiresSwapSteelSizeList);
  }

  removeWheelSwapSteelSize(service: Services) {
    this.removeTiresSwapSize(service, this.wheelSwapSteelSizeList);
  }

  removeWheelBalanceSteelSize(service: Services) {
    this.removeTiresSwapSize(service, this.wheelBalanceSteelSizeList);
  }

  removeTiresSwapSize(service: Services, list: Services[]) {
    const index = this.getIndexFromSizeList(list, service._id);
    list.splice(index, 1);
  }

  setPrice(input: HTMLInputElement, service: Services) {
    service.price = +input.value;
    if (input.value.length > 0) {
      service.price = +input.value;
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
    if (isNaN(this.tiresSwap.price!)) {
      this.tiresSwap.price = null;
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
    if (isNaN(this.tiresSwapAlu.price!)) {
      this.tiresSwapAlu.price = null;
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
    if (isNaN(this.tiresSwapSteel.price!)) {
      this.tiresSwapSteel.price = null;
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
    if (isNaN(this.wheelSwap.price!)) {
      this.wheelSwap.price = null;
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
    if (isNaN(this.wheelSwapAlu.price!)) {
      this.wheelSwapAlu.price = null;
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
    if (isNaN(this.wheelSwapSteel.price!)) {
      this.wheelSwapSteel.price = null;
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
    if (isNaN(this.wheelBalance.price!)) {
      this.wheelBalance.price = null;
      this.messageWheelBalancePriceNotValid = true;
    } else {
      this.messageWheelBalancePriceNotValid = false;
    }
  }

  setPriceWheelBalanceAlu(input: HTMLInputElement) {
    this.setPrice(input, this.wheelBalanceAlu);
    if (this.wheelBalanceAlu.price == null) {
      this.messageWheelBalanceAluPriceIsReq = true;
    } else {
      this.messageWheelBalanceAluPriceIsReq = false;
    }
    if (isNaN(this.wheelBalanceAlu.price!)) {
      this.wheelBalanceAlu.price = null;
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
    if (isNaN(this.wheelBalanceSteel.price!)) {
      this.wheelBalanceSteel.price = null;
      this.messageWheelBalanceSteelPriceNotValid = true;
    } else {
      this.messageWheelBalanceSteelPriceNotValid = false;
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

  setPriceAluSize(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.tiresSwapAluSizeList);
  }

  setPriceAluSizeWheelSwap(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.wheelSwapAluSizeList);
  }

  setPriceAluSizeWheelBalance(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.wheelBalanceAluSizeList);
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

  setPriceSize(_id: number, input: HTMLInputElement, list: Services[]) {
    const index = this.getIndexFromSizeList(list, _id);
    if (input.value.length > 0) {
      list[index].price = +input.value;
    } else {
      list[index].price = null;
    }

    if (list[index].price == null) {
      list[index].messagePriceIsReq = true;
    } else {
      list[index].messagePriceIsReq = false;
    }

    if (isNaN(list[index].price!)) {
      list[index].price = null;
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

  setSteelSizeTime(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.tiresSwapSteelSizeList);
  }

  setSteelSizeTimeWheelSwap(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.wheelSwapSteelSizeList);
  }

  setSteelSizeTimeWheelBalance(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.wheelBalanceSteelSizeList);
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
