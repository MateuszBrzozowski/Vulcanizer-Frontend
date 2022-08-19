import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { NotificationService } from 'src/app/service/notification.service';
import { PublicHolidays, PublicHolidaysService } from 'src/app/service/public-holidays.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-public-holidays',
  templateUrl: './public-holidays.component.html',
  styleUrls: ['./public-holidays.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PublicHolidaysComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'repeat', 'action'];
  currentYear: PublicHolidays[] = new Array<PublicHolidays>;
  currentYearSource = new MatTableDataSource(this.currentYear);
  nextYear: PublicHolidays[] = new Array<PublicHolidays>;
  nextYearSource = new MatTableDataSource(this.nextYear);

  nameControl: FormControl = new FormControl('');
  nameIsEmpty: boolean = false;
  everyYearForNew: boolean = false;

  @ViewChild(MatTable) table: MatTable<PublicHolidays> | undefined;

  constructor(private holidaysService: PublicHolidaysService,
    public notificationService: NotificationService,
    public dialog: MatDialog) { }

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
        this.refreshTableNextYear();
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

  addNew(date: HTMLInputElement) {
    const body = new PublicHolidays();
    body.date = date.value;
    body.everyYear = this.everyYearForNew;
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

  deletePublicHoliday(id: string, name: string){
    const dialogRef = this.dialog.open(RemoveDialogComponent, {data: name});
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.holidaysService.delete(id).subscribe({
          next: (response) => {
            this.notificationService.notify(
              NotificationType.SUCCESS,
              "Usunięto poprawnie."
            );
          },
          error: (error) => {
            this.notificationService.notify(
              NotificationType.ERROR,
              error.error.message
            );
          }
        });
      }
    });
  }
}

// [(ngModel)]="dateForNew"