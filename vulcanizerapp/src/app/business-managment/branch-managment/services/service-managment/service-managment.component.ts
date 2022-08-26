import { Component, OnInit, Type } from '@angular/core';
import { Services, TypOfServices, WheelType } from 'src/app/model/services';

@Component({
  selector: 'app-service-managment',
  templateUrl: './service-managment.component.html',
  styleUrls: ['./service-managment.component.css'],
})
export class ServiceManagmentComponent implements OnInit {
  tiresSwapChecked: boolean = true;
  wheelSwapChecked: boolean = true;
  tiresSwapAluChecked: boolean = true;
  tiresSwapAluSizeChecked: boolean = true;
  tiresSwapSteelChecked: boolean = true;
  wheelBalanceChecked: boolean = true;
  straighteningRimsChecked: boolean = true;

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

  constructor() {}

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
    console.log(this.tiresSwapAlu.time);

    services.time = this.tiresSwapAlu.time;
    this.tiresSwapAluSizeList.push(services);
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
    const index = this.getIndexFromSizeList(
      this.tiresSwapAluSizeList,
      service._id
    );
    this.tiresSwapAluSizeList.splice(index, 1);
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
    const index = this.getIndexFromSizeList(this.tiresSwapAluSizeList, _id);
    if (input.value.length > 0) {
      this.tiresSwapAluSizeList[index].price = +input.value;
    } else {
      this.tiresSwapAluSizeList[index].price = null;
    }

    if (this.tiresSwapAluSizeList[index].price == null) {
      this.tiresSwapAluSizeList[index].messagePriceIsReq = true;
    } else {
      this.tiresSwapAluSizeList[index].messagePriceIsReq = false;
    }

    if (isNaN(this.tiresSwapAluSizeList[index].price!)) {
      this.tiresSwapAluSizeList[index].price = null;
      this.tiresSwapAluSizeList[index].messagePriceNotValid = true;
    } else {
      this.tiresSwapAluSizeList[index].messagePriceNotValid = false;
    }
  }

  setAluSize(
    _id: number,
    inputFrom: HTMLInputElement,
    inputTo: HTMLInputElement
  ) {
    const index = this.getIndexFromSizeList(this.tiresSwapAluSizeList, _id);
    if (inputFrom.value.length > 0) {
      this.tiresSwapAluSizeList[index].sizeTo = +inputFrom.value;
    } else {
      this.tiresSwapAluSizeList[index].sizeTo = null;
    }
    if (inputTo.value.length > 0) {
      this.tiresSwapAluSizeList[index].sizeFrom = +inputTo.value;
    } else {
      this.tiresSwapAluSizeList[index].sizeFrom = null;
    }

    const sizeTo = this.tiresSwapAluSizeList[index].sizeTo;
    const sizeFrom = this.tiresSwapAluSizeList[index].sizeFrom;

    if (
      sizeTo == null ||
      isNaN(sizeTo) ||
      sizeFrom == null ||
      isNaN(sizeFrom)
    ) {
      this.tiresSwapAluSizeList[index].messageSizeNotValid = true;
      return;
    } else {
      if (sizeTo < sizeFrom) {
        this.tiresSwapAluSizeList[index].messageSizeNotValid = true;
        return;
      } else {
        this.tiresSwapAluSizeList[index].messageSizeNotValid = false;
      }

      for (let i = 0; i < this.tiresSwapAluSizeList.length - 1; i++) {
        const elementI = this.tiresSwapAluSizeList[i];
        for (let j = i + 1; j < this.tiresSwapAluSizeList.length; j++) {
          const elementJ = this.tiresSwapAluSizeList[j];
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
    const index = this.getIndexFromSizeList(this.tiresSwapAluSizeList, _id);
    if (input.value.length == 5) {
      this.tiresSwapAluSizeList[index].time =
        input.value.slice(0, 2) + ':' + input.value.slice(3, 5);
      this.tiresSwapAluSizeList[index].messageSizeTimeReq = false;
    } else {
      this.tiresSwapAluSizeList[index].messageSizeTimeReq = true;
    }
  }
}
