import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/service/notification.service';
import { PublicHolidays, PublicHolidaysService } from 'src/app/service/public-holidays.service';

@Component({
  selector: 'app-public-holidays',
  templateUrl: './public-holidays.component.html',
  styleUrls: ['./public-holidays.component.css']
})
export class PublicHolidaysComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'repeat', 'action'];
  currentYear: PublicHolidays[] = new Array<PublicHolidays>;
  currentYearSource = new MatTableDataSource(this.currentYear);
  nextYear: PublicHolidays[] = new Array<PublicHolidays>;
  nextYearSource = new MatTableDataSource(this.nextYear);

  dateForNew !: Date | null;
  nameControl: FormControl = new FormControl('');
  nameIsEmpty: boolean = false;
  everyYearForNew: boolean = false;

  @ViewChild(MatTable) table: MatTable<PublicHolidays> | undefined;

  constructor(private holidaysService: PublicHolidaysService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.pullCurrentYear();
    this.pullNextYear();
  }

  pullCurrentYear() {
    this.holidaysService.pullCurentYear().subscribe({
      next: (response) => {
        if (response.body == null) {
          return;
        }
        this.currentYear = response.body;
        this.refreshTableCurrentYear();
      },
      error: (error) => {
        this.notificationService.notify(
          NotificationType.ERROR,
          "Błąd pobierania dni wolnych od pracy z obecnego roku"
        );
      }
    });
  }

  pullNextYear() {
    this.holidaysService.pullNextYear().subscribe({
      next: (response) => {
        if (response.body == null) {
          return;
        }
        this.nextYear = response.body;
        this.refreshTableCurrentYear();
      },
      error: (error) => {
        this.notificationService.notify(
          NotificationType.ERROR,
          "Błąd pobierania dni wolnych od pracy z obecnego roku"
        );
      }
    });
  }

  refreshTableCurrentYear() {
    this.currentYearSource = new MatTableDataSource(this.currentYear);
  }

  refreshTableNextYear() {
    this.nextYearSource = new MatTableDataSource(this.nextYear);
  }

  checkNameInput() {
    if (this.nameControl.value == '') {
      this.nameIsEmpty = true;
    } else {
      this.nameIsEmpty = false;
    }
  }

  everyYearChange() {
    if (this.everyYearForNew) {
      this.everyYearForNew = false;
    } else {
      this.everyYearForNew = true;
    }
  }

  addNew(date : HTMLInputElement) {
    const body = new PublicHolidays();
    body.date = date.value;
    body.everyYear  = this.everyYearForNew;
    body.name = this.nameControl.value;
    this.holidaysService.pushNew(body).subscribe({
      next: (response) => {
        this.notificationService.notify(
          NotificationType.SUCCESS,
          "Dodano poprawnie."
        );
      },
      error: (error) => {
        this.notificationService.notify(
          NotificationType.ERROR,
          error.error.message
        );
      }
    })
  }

}

// [(ngModel)]="dateForNew"