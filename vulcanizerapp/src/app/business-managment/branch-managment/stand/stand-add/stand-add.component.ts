import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Stand } from 'src/app/business';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { BusinessService } from 'src/app/service/business.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/user.service';
import { BranchManagmentComponent } from '../../branch-managment.component';

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
    private userService: UserService,
    private notification: NotificationService,
    public dialogRef: MatDialogRef<StandAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
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
    
  }
}
