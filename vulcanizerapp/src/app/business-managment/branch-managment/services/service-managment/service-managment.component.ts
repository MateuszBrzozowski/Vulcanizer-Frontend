import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-managment',
  templateUrl: './service-managment.component.html',
  styleUrls: ['./service-managment.component.css']
})
export class ServiceManagmentComponent implements OnInit {
  tiresSwapChecked : boolean = true;
  wheelSwapChecked : boolean = true;
  tiresSwapAluChecked : boolean = true;
  tiresSwapAluSizeChecked : boolean = true;
  tiresSwapSteelChecked : boolean = true;
  wheelBalanceChecked : boolean = true;
  straighteningRimsChecked : boolean = true;

  tiresSwapAluSizeList : string[] = new Array<string>()

  constructor() { }

  ngOnInit(): void {
    this.testAluSize();
  }

  testAluSize() {
    // this.tiresSwapAluSizeList.push("Test 1");
    // this.tiresSwapAluSizeList.push("Test 2");
  }

}
