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
  tiresSwapAluChecked: boolean = false;
  tiresSwapAluSizeChecked: boolean = false;
  tiresSwapSteelChecked: boolean = false;
  tiresSwapSteelSizeChecked: boolean = false;
  wheelBalanceChecked: boolean = false;
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

  tiresSwap: Services = new Services();
  tiresSwapAlu: Services = new Services();
  tiresSwapSteel: Services = new Services();
  tiresSwapAluSizeList: Services[] = new Array<Services>();
  tiresSwapSteelSizeList: Services[] = new Array<Services>();

  constructor() { }

  ngOnInit(): void {
    this.tiresSwapInit();
  }

  tiresSwapInit() {
    //pobieranie z BE danych i przypisanie do odpowiednich elementw tutej
    this.tiresSwap.typOfServices = TypOfServices.TIRES_SWAP;
    this.tiresSwapAlu.typOfServices = TypOfServices.TIRES_SWAP;
    this.tiresSwapAlu.wheelType = WheelType.ALUMINIUM;
    // this.tiresSwapAlu.price = this.tiresSwap.price;
    // this.tiresSwapAlu.time = this.tiresSwap.time;
    this.tiresSwapSteel.typOfServices = TypOfServices.TIRES_SWAP;
    this.tiresSwapSteel.wheelType = WheelType.STEEL;
    // this.tiresSwapSteel.price = this.tiresSwap.price;
    // this.tiresSwapSteel.time = this.tiresSwap.time;
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

  removeTiresSwapSteelSize(service: Services) {
    this.removeTiresSwapSize(service, this.tiresSwapSteelSizeList);
  }

  removeTiresSwapSize(service: Services, list: Services[]) {
    const index = this.getIndexFromSizeList(list, service._id);
    list.splice(index, 1);
  }

  setPriceTiresSwap(input: HTMLInputElement) {
    this.tiresSwap.price = +input.value;
    if (input.value.length > 0) {
      this.tiresSwap.price = +input.value;
    } else {
      this.tiresSwap.price = null;
    }
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
    this.tiresSwapAlu.price = +input.value;
    if (input.value.length > 0) {
      this.tiresSwapAlu.price = +input.value;
    } else {
      this.tiresSwapAlu.price = null;
    }
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
    this.tiresSwapSteel.price = +input.value;
    if (input.value.length > 0) {
      this.tiresSwapSteel.price = +input.value;
    } else {
      this.tiresSwapSteel.price = null;
    }
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

  setTimeTiresSwap(input: HTMLInputElement) {
    if (input.value.length == 5) {
      this.tiresSwap.time =
        input.value.slice(0, 2) + ':' + input.value.slice(3, 5);
      this.messageTiresSwapTimeReq = false;
    } else {
      this.tiresSwap.time = null;
      this.messageTiresSwapTimeReq = true;
    }
  }

  setTimeTiresSwapAlu(input: HTMLInputElement) {
    console.log(this.tiresSwapAlu);
    if (input.value.length == 5) {
      this.tiresSwapAlu.time =
        input.value.slice(0, 2) + ':' + input.value.slice(3, 5);
      this.messageTiresSwapAluTimeReq = false;
    } else {
      this.tiresSwapAlu.time = null;
      this.messageTiresSwapAluTimeReq = true;
    }
  }

  setTimeTiresSwapSteel(input: HTMLInputElement) {
    console.log(this.tiresSwapSteel);

    if (input.value.length == 5) {
      this.tiresSwapSteel.time =
        input.value.slice(0, 2) + ':' + input.value.slice(3, 5);
      this.messageTiresSwapSteelTimeReq = false;
    } else {
      this.tiresSwapSteel.time = null;
      this.messageTiresSwapSteelTimeReq = true;
    }
  }

  setPriceAluSize(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.tiresSwapAluSizeList);
  }

  setPriceSteelSize(_id: number, input: HTMLInputElement) {
    this.setPriceSize(_id, input, this.tiresSwapSteelSizeList);
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

  setAluSize(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement
  ) {
    this.setSize(_id, inputFrom, inputTo, this.tiresSwapAluSizeList);
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

  setSteelSizeTime(_id: number, input: HTMLInputElement) {
    this.setSizeTime(_id, input, this.tiresSwapSteelSizeList);
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
