import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MY_FORMATS } from 'src/app/admin-managment/util/public-holidays/public-holidays.component';
import { CompanyBranchResponse, OpeningHours, Stand } from 'src/app/business';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { BusinessService } from 'src/app/service/business.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PublicHolidays, PublicHolidaysService } from 'src/app/service/public-holidays.service';
import { UserService } from 'src/app/user.service';
import { StandAddComponent } from './stand/stand-add/stand-add.component';
import { StandRemoveComponent } from './stand/stand-remove/stand-remove.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { CustomOpeningHours } from 'src/app/service/customOpeningHours';

@Component({
  selector: 'app-branch-managment',
  templateUrl: './branch-managment.component.html',
  styleUrls: ['./branch-managment.component.css'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BranchManagmentComponent implements OnInit {
  usersCompanyBranches: CompanyBranchResponse[] = new Array<CompanyBranchResponse>;
  usersCompanyBranch: CompanyBranchResponse = new CompanyBranchResponse;
  public branchId!: number;
  viewInfo: boolean = false;
  viewCallendar: boolean = false;
  viewOpinion: boolean = false;
  viewStand: boolean = false;
  viewServices: boolean = false;
  viewOpeningHours: boolean = true;

  // 
  // List of Stand
  // 
  displayColumnsStand = ['Numer', 'Akcja'];
  sourceStand: Stand[] = this.businessService.getSavedStands();
  @ViewChild(MatTable) table!: MatTable<Stand>;
  dataSourceStand = new MatTableDataSource(this.sourceStand);

  //
  // Opening hours
  //
  options: string[] = ['0:00', '0:15'];
  filteredOptions!: Observable<string[]>;
  monEnabled = false;
  tueEnabled = false;
  wedEnabled = false;
  thuEnabled = false;
  friEnabled = false;
  satEnabled = false;
  sunEnabled = false;
  monIsOpen: string = 'Zamknięte';
  tueIsOpen: string = 'Zamknięte';
  wedIsOpen: string = 'Zamknięte';
  thuIsOpen: string = 'Zamknięte';
  friIsOpen: string = 'Zamknięte';
  satIsOpen: string = 'Zamknięte';
  sunIsOpen: string = 'Zamknięte';
  monFromControl = new FormControl({ value: '', disabled: true });
  monToControl = new FormControl({ value: '', disabled: true });
  tueFromControl = new FormControl({ value: '', disabled: true });
  tueToControl = new FormControl({ value: '', disabled: true });
  wedFromControl = new FormControl({ value: '', disabled: true });
  wedToControl = new FormControl({ value: '', disabled: true });
  thuFromControl = new FormControl({ value: '', disabled: true });
  thuToControl = new FormControl({ value: '', disabled: true });
  friFromControl = new FormControl({ value: '', disabled: true });
  friToControl = new FormControl({ value: '', disabled: true });
  satFromControl = new FormControl({ value: '', disabled: true });
  satToControl = new FormControl({ value: '', disabled: true });
  sunFromControl = new FormControl({ value: '', disabled: true });
  sunToControl = new FormControl({ value: '', disabled: true });
  customFromControl = new FormControl({ value: '', disabled: true });
  customToControl = new FormControl({ value: '', disabled: true });
  monFromSavedData: string = '';
  monToSavedData: string = '';
  tueFromSavedData: string = '';
  tueToSavedData: string = '';
  wedFromSavedData: string = '';
  wedToSavedData: string = '';
  thuFromSavedData: string = '';
  thuToSavedData: string = '';
  friFromSavedData: string = '';
  friToSavedData: string = '';
  satFromSavedData: string = '';
  satToSavedData: string = '';
  sunFromSavedData: string = '';
  sunToSavedData: string = '';

  // 
  // Next Public Holidays
  // 
  displayedColumnsPublicHolidays: string[] = ['date', 'name'];
  currentNextPublicHolidays: PublicHolidays[] = new Array<PublicHolidays>;
  currentNextPublicHolidaysSource = new MatTableDataSource(this.currentNextPublicHolidays);
  arePublicHolidays : boolean = false;

  // 
  // Custom hours opening
  // 
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  customEnabled = false;
  customIsOpen: string = 'Zamknięte';
  displayedColumns: string[] = ['date', 'time', 'action'];
  customOpeningHours: CustomOpeningHours[] = new Array<CustomOpeningHours>;
  customOpeningHoursource = new MatTableDataSource(this.customOpeningHours);


  constructor(private authenticationService: AuthenticationService,
    private holidaysService: PublicHolidaysService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private businessService: BusinessService,
    private notification: NotificationService) { }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;

  ngOnInit(): void {
    this.isAvailable();
    this.fillHoursOpening();
    this.filteredOptions = this.monFromControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.pullHoursOpening();
    this.pullPublicHolidaysNextTwoMonths();
    this.pullCustomHoursOpening();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  fillHoursOpening() {
    const hoursList = new Array<string>;
    for (let i = 0; i < 24; i++) {
      let hour: string = i.toString();
      hour += ':';
      for (let j = 0; j < 4; j++) {
        let time = hour;
        const min: string = (j * 15).toString();
        if (j === 0) {
          time += '00';
        } else {
          time += min;
        }
        hoursList.push(time);
      }
    }
    this.options = hoursList;
  }

  isAvailable() {
    if (this.authenticationService.isLoggedIn()) {
      if (this.userService.isCompanyActive()) {
        this.usersCompanyBranches = this.userService.getOnlyActiveCompanyBranchesFromLocalStorage();
        if (this.usersCompanyBranches.length > 1) {
          this.usersCompanyBranch = this.userService.getSelectedCompanyBranch();
        } else if (this.usersCompanyBranches.length === 1) {
          this.usersCompanyBranch = this.usersCompanyBranches[0];
          this.userService.setSelectedCompanyBranch(this.usersCompanyBranch);
        } else {
          this.router.navigateByUrl('');
        }
        this.getAllStands();
      } else {
        this.router.navigateByUrl('');
      }
    }
  }

  setViewHidden() {
    this.viewInfo = false;
    this.viewCallendar = false;
    this.viewOpinion = false;
    this.viewStand = false;
    this.viewServices = false;
    this.viewOpeningHours = false;
  }

  setViewInfo() {
    this.setViewHidden();
    this.viewInfo = true;
  }

  setViewCallendar() {
    this.setViewHidden();
    this.viewCallendar = true;
  }

  setViewOpinion() {
    this.setViewHidden();
    this.viewOpinion = true;
  }

  setViewStand() {
    this.setViewHidden();
    this.viewStand = true;
  }

  setViewOpeningHours() {
    this.setViewHidden();
    this.viewOpeningHours = true;
  }

  getAllStands() {
    this.businessService.getAllStands(this.usersCompanyBranch.id).subscribe({
      next: (response) => {
        if (response.body === null) {
          return;
        }
        this.sourceStand = response.body;
        this.businessService.saveStands(response.body);
        this.refreshTable();
      },
      error: (error) => {
        this.notification.notify(NotificationType.ERROR, "Coś poszło nie tak. Spróbuj ponownie później");
      }
    })
  }

  setViewServices() {
    this.setViewHidden();
    this.viewServices = true;
  }

  standAdd() {
    const dialogRef = this.dialog.open(StandAddComponent, { data: 1 });
    dialogRef.afterClosed().subscribe(result => {
      if (result > 0 && result <= 10) {
        this.businessService
          .standAdd(this.usersCompanyBranch.id, result)
          .subscribe({
            next: (response) => {
              if (response.body === null) {
                return;
              }
              this.sourceStand = response.body;
              this.refreshTable();
            },
            error: (error) => {
              if (error.error.message === "Max count of stands") {
                this.notification.notify(NotificationType.ERROR, "Łączna maksymalna liczba stanowisk - 10");
                return;
              }
              this.notification.notify(
                NotificationType.ERROR,
                'Coś poszło nie tak. Spróbuj ponownie później'
              );
            },
          });
      }
    });
  }

  standRemove(btnRemove: HTMLButtonElement) {
    const dialogRef = this.dialog.open(StandRemoveComponent, { data: btnRemove.value });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.businessService.standRemove(this.usersCompanyBranch.id, btnRemove.value).subscribe({
          next: (response) => {
            if (response.body === null) {
              return;
            }
            this.sourceStand = response.body;
            this.refreshTable();
          },
          error: (error) => {
            this.notification.notify(
              NotificationType.ERROR,
              'Coś poszło nie tak. Spróbuj ponownie później'
            );
          }
        })
      }
    })
  }

  refreshTable() {
    this.dataSourceStand = new MatTableDataSource(this.sourceStand);
  }

  changeFormControl(isEnable: boolean, from: FormControl, to: FormControl) {
    if (isEnable) {
      from.disable();
      from.setValue('');
      to.disable();
      to.setValue('');
    } else {
      from.enable();
      from.setValue('7:00');
      to.enable();
      to.setValue('16:00');
    }
  }

  monOpenClick() {
    if (this.monEnabled) {
      this.monEnabled = false;
      this.monIsOpen = "Zamknięte";
      this.changeFormControl(true, this.monFromControl, this.monToControl);
    } else {
      this.monEnabled = true;
      this.monIsOpen = "Otwarte";
      this.changeFormControl(false, this.monFromControl, this.monToControl);
    }
  }

  tueOpenClick() {
    if (this.tueEnabled) {
      this.tueEnabled = false;
      this.tueIsOpen = "Zamknięte";
      this.changeFormControl(true, this.tueFromControl, this.tueToControl);
    } else {
      this.tueEnabled = true;
      this.tueIsOpen = "Otwarte";
      this.changeFormControl(false, this.tueFromControl, this.tueToControl);
    }
  }

  wedOpenClick() {
    if (this.wedEnabled) {
      this.wedEnabled = false;
      this.wedIsOpen = "Zamknięte";
      this.changeFormControl(true, this.wedFromControl, this.wedToControl);
    } else {
      this.wedEnabled = true;
      this.wedIsOpen = "Otwarte";
      this.changeFormControl(false, this.wedFromControl, this.wedToControl);
    }
  }

  thuOpenClick() {
    if (this.thuEnabled) {
      this.thuEnabled = false;
      this.thuIsOpen = "Zamknięte";
      this.changeFormControl(true, this.thuFromControl, this.thuToControl);
    } else {
      this.thuEnabled = true;
      this.thuIsOpen = "Otwarte";
      this.changeFormControl(false, this.thuFromControl, this.thuToControl);
    }
  }

  friOpenClick() {
    if (this.friEnabled) {
      this.friEnabled = false;
      this.friIsOpen = "Zamknięte";
      this.changeFormControl(true, this.friFromControl, this.friToControl);
    } else {
      this.friEnabled = true;
      this.friIsOpen = "Otwarte";
      this.changeFormControl(false, this.friFromControl, this.friToControl);
    }
  }

  satOpenClick() {
    if (this.satEnabled) {
      this.satEnabled = false;
      this.satIsOpen = "Zamknięte";
      this.changeFormControl(true, this.satFromControl, this.satToControl);
    } else {
      this.satEnabled = true;
      this.satIsOpen = "Otwarte";
      this.changeFormControl(false, this.satFromControl, this.satToControl);
    }
  }

  sunOpenClick() {
    if (this.sunEnabled) {
      this.sunEnabled = false;
      this.sunIsOpen = "Zamknięte";
      this.changeFormControl(true, this.sunFromControl, this.sunToControl);
    } else {
      this.sunEnabled = true;
      this.sunIsOpen = "Otwarte";
      this.changeFormControl(false, this.sunFromControl, this.sunToControl);
    }
  }

  saveHoursOpening() {
    if(!this.checkHoursOpeningDataIsChanges()){
      this.notification.notify(NotificationType.INFO,"Nie dokonano żadnej zmiany. Dane zapisane");
      return;
    }
    const hoursOpening = new Array<OpeningHours>
    const mon = new OpeningHours();
    mon.day = "MONDAY";
    const tue = new OpeningHours();
    tue.day = "TUESDAY";
    const wed = new OpeningHours();
    wed.day = "WEDNESDAY";
    const thu = new OpeningHours();
    thu.day = "THURSDAY";
    const fri = new OpeningHours();
    fri.day = "FRIDAY";
    const sat = new OpeningHours();
    sat.day = "SATURDAY";
    const sun = new OpeningHours();
    sun.day = "SUNDAY";
    if (this.monEnabled) {
      mon.openTime = this.monFromControl.value!;
      mon.closeTime = this.monToControl.value!;
    } else {
      mon.openTime = null;
      mon.closeTime = null;
    }
    if (this.tueEnabled) {
      tue.openTime = this.tueFromControl.value!;
      tue.closeTime = this.tueToControl.value!;
    } else {
      tue.openTime = null;
      tue.closeTime = null;
    }
    if (this.wedEnabled) {
      wed.openTime = this.wedFromControl.value!;
      wed.closeTime = this.wedToControl.value!;
    } else {
      wed.openTime = null;
      wed.closeTime = null;
    }
    if (this.thuEnabled) {
      thu.openTime = this.thuFromControl.value!;
      thu.closeTime = this.thuToControl.value!;
    } else {
      thu.openTime = null;
      thu.closeTime = null;
    }
    if (this.friEnabled) {
      fri.openTime = this.friFromControl.value!;
      fri.closeTime = this.friToControl.value!;
    } else {
      fri.openTime = null;
      fri.closeTime = null;
    }
    if (this.satEnabled) {
      sat.openTime = this.satFromControl.value!;
      sat.closeTime = this.satToControl.value!;
    } else {
      sat.openTime = null;
      sat.closeTime = null;
    }
    if (this.sunEnabled) {
      sun.openTime = this.sunFromControl.value!;
      sun.closeTime = this.sunToControl.value!;
    } else {
      sun.openTime = null;
      sun.closeTime = null;
    }
    hoursOpening.push(mon);
    hoursOpening.push(tue);
    hoursOpening.push(wed);
    hoursOpening.push(thu);
    hoursOpening.push(fri);
    hoursOpening.push(sat);
    hoursOpening.push(sun);
    this.businessService.pushHoursOpening(this.usersCompanyBranch.id, hoursOpening).subscribe({
      next: (response) => {
        this.notification.notify(NotificationType.SUCCESS,
          "Zmiany zapisane poprawnie");
          this.setSavedOpeningHoursData();
      },
      error: (error) => {
        this.notification.notify(NotificationType.ERROR,
          "Coś poszło nie tak. Sprawdź dane i spróbuj ponownie później");
      }
    })

  }

  customOpenClick() {

  }

  pullHoursOpening() {
    this.businessService.pullHoursOpening(this.usersCompanyBranch.id).subscribe({
      next: (response) => {
        const hoursOpening = response.body;
        if (hoursOpening === null) {
          return;
        }
        const dayOfWeeks: string[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
        for (let i = 0; i < dayOfWeeks.length; i++) {
          const dayName = dayOfWeeks[i];
          for (let j = 0; j < hoursOpening.length; j++) {
            const element = hoursOpening[j];
            if (dayName === element.day) {
              if (element.openTime != null && element.closeTime != null) {
                this.setTimes(dayName, element.openTime, element.closeTime);
              }
            }
          }
        }
        this.setSavedOpeningHoursData();
      },
      error: (error) => {
        this.notification.notify(NotificationType.ERROR, "Coś poszło nie tak, spróbuj ponownie później");
      }
    })
  }

  setValueAndEnabledFormControls(from: FormControl, open: string, to: FormControl, close: string) {
    from.enable();
    from.setValue(open);
    to.enable();
    to.setValue(close);
  }

  setSavedOpeningHoursData() {
    this.monFromSavedData = this.monFromControl.value!;
    this.monToSavedData = this.monToControl.value!;
    this.tueFromSavedData = this.tueFromControl.value!;
    this.tueToSavedData = this.tueToControl.value!;
    this.wedFromSavedData = this.wedFromControl.value!;
    this.wedToSavedData = this.wedToControl.value!;
    this.thuFromSavedData = this.thuFromControl.value!;
    this.thuToSavedData = this.thuToControl.value!;
    this.friFromSavedData = this.friFromControl.value!;
    this.friToSavedData = this.friToControl.value!;
    this.satFromSavedData = this.satFromControl.value!;
    this.satToSavedData = this.satToControl.value!;
    this.sunFromSavedData = this.sunFromControl.value!;
    this.sunToSavedData = this.sunToControl.value!;
  }

  checkHoursOpeningDataIsChanges(): boolean{
    if(this.monFromSavedData != this.monFromControl.value!){
      return true;
    }
    if(this.monToSavedData != this.monToControl.value!){
      return true;
    }
    if(this.tueFromSavedData != this.tueFromControl.value!){
      return true;
    }
    if(this.tueToSavedData != this.tueToControl.value!){
      return true;
    }
    if( this.wedFromSavedData != this.wedFromControl.value!){
      return true;
    }
    if( this.wedToSavedData != this.wedToControl.value!){
      return true;
    }
    if( this.thuFromSavedData != this.thuFromControl.value!){
      return true;
    }
    if( this.thuToSavedData != this.thuToControl.value!){
      return true;
    }
    if( this.friFromSavedData != this.friFromControl.value!){
      return true;
    }
    if( this.friToSavedData != this.friToControl.value!){
      return true;
    }
    if( this.satFromSavedData != this.satFromControl.value!){
      return true;
    }
    if( this.satToSavedData != this.satToControl.value!){
      return true;
    }
    if( this.sunFromSavedData != this.sunFromControl.value!){
      return true;
    }
    if( this.sunToSavedData != this.sunToControl.value!){
      return true;
    }
    return false;
  }

  setTimes(dayName: string, open: string, close: string) {
    open = open.substring(0, 5);
    close = close.substring(0, 5);
    if (dayName == "MONDAY") {
      this.monEnabled = true;
      this.monIsOpen = "Otwarte";
      this.setValueAndEnabledFormControls(this.monFromControl, open, this.monToControl, close);
    } else if (dayName == "TUESDAY") {
      this.tueEnabled = true;
      this.tueIsOpen = "Otwarte";
      this.setValueAndEnabledFormControls(this.tueFromControl, open, this.tueToControl, close);
    } else if (dayName == "WEDNESDAY") {
      this.wedEnabled = true;
      this.wedIsOpen = "Otwarte";
      this.setValueAndEnabledFormControls(this.wedFromControl, open, this.wedToControl, close);
    } else if (dayName == "THURSDAY") {
      this.thuEnabled = true;
      this.thuIsOpen = "Otwarte";
      this.setValueAndEnabledFormControls(this.thuFromControl, open, this.thuToControl, close);
    } else if (dayName == "FRIDAY") {
      this.friEnabled = true;
      this.friIsOpen = "Otwarte";
      this.setValueAndEnabledFormControls(this.friFromControl, open, this.friToControl, close);
    } else if (dayName == "SATURDAY") {
      this.satEnabled = true;
      this.satIsOpen = "Otwarte";
      this.setValueAndEnabledFormControls(this.satFromControl, open, this.satToControl, close);
    } else if (dayName == "SUNDAY") {
      this.sunEnabled = true;
      this.sunIsOpen = "Otwarte";
      this.setValueAndEnabledFormControls(this.sunFromControl, open, this.sunToControl, close);
    }
  }

  pullPublicHolidaysNextTwoMonths(){
    this.holidaysService.pullNextTwoMonths().subscribe({
      next: (response) => {
        if(response.body ==null){
          return;
        }
        this.currentNextPublicHolidays = response.body;
        if(this.currentNextPublicHolidays.length == 0) {
        }else {
          this.arePublicHolidays =true;
          this.refreshTableNextTwoMonthsPublicHolidays();
        }
      }
    })
  }

  refreshTableNextTwoMonthsPublicHolidays() {
    this.currentNextPublicHolidaysSource = new MatTableDataSource(this.currentNextPublicHolidays);
  }

  pullCustomHoursOpening(){
    this.businessService.pullCustomHoursOpening(this.usersCompanyBranch.id).subscribe({
      next: (response) => {
          if(response.body ==null) {
            return;
          }
          this.customOpeningHours = response.body;
          console.log(this.customOpeningHours);
          
          this.refreshTableCustomOpeningHours();
      },
      error: (error) => {
        this.notification.notify(NotificationType.ERROR,
          error.error.message)
      }
    })
  }

  refreshTableCustomOpeningHours(){
    this.customOpeningHoursource = new MatTableDataSource(this.customOpeningHours);
  }
}
