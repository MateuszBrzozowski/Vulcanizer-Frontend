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
    console.log(services);
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
}
