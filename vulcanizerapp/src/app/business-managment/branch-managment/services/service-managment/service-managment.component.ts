import { Component, OnInit } from '@angular/core';
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

  tiresSwapAluSizeList: Services[] = new Array<Services>();

  constructor() {}

  ngOnInit(): void {
    this.testAluSize();
  }

  testAluSize() {
    // this.tiresSwapAluSizeList.push("Test 1");
    // this.tiresSwapAluSizeList.push("Test 2");
  }

  addTiresSwapAluSize() {
    const services: Services = new Services();
    services.typOfServices = TypOfServices.TIRES_SWAP;
    services.wheelType = WheelType.ALUMINIUM;
    services._id = this.tiresSwapAluSizeList.length;
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

  setPriceAlu(_id: number, input: HTMLInputElement) {
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

  setAluTime(_id: number, input: HTMLInputElement) {
    const index = this.getIndexFromSizeList(this.tiresSwapAluSizeList, _id);
    if (input.value.length == 5) {
      this.tiresSwapAluSizeList[index].time = {
        hours: +input.value.slice(0, 2),
        minutes: +input.value.slice(3, 5),
      };
      this.tiresSwapAluSizeList[index].messageSizeTimeReq = false;
    } else {
      this.tiresSwapAluSizeList[index].messageSizeTimeReq = true;
    }
  }
}
