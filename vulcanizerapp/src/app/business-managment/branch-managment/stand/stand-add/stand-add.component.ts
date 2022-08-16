import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/service/business.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-stand-add',
  templateUrl: './stand-add.component.html',
  styleUrls: ['./stand-add.component.css'],
})
export class StandAddComponent implements OnInit {
  standAddMax: number = 10;
  standAddMin: number = 1;
  value = 1;

  constructor(
    private businessService: BusinessService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  checkValue() {
    if (this.value > 10) {
      this.value = 10;
    } else if (this.value < 1) {
      this.value = 1;
    }
  }

  standAdd() {
    const commpanyBranch = this.userService.getSelectedCompanyBranch();
    this.businessService.standAdd(commpanyBranch.id, this.value.toString());
  }
}
