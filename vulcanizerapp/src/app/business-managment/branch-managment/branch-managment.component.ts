import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CompanyBranchResponse, Stand } from 'src/app/business';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { BusinessService } from 'src/app/service/business.service';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/user.service';
import { StandAddComponent } from './stand/stand-add/stand-add.component';
import { StandRemoveComponent } from './stand/stand-remove/stand-remove.component';

@Component({
  selector: 'app-branch-managment',
  templateUrl: './branch-managment.component.html',
  styleUrls: ['./branch-managment.component.css']
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
  monEnabled = true;
  tueEnabled = true;
  wedEnabled = true;
  thuEnabled = true;
  friEnabled = true;
  satEnabled = false;
  sunEnabled = false;
  monIsOpen: string = 'Otwarte';
  tueIsOpen: string = 'Otwarte';
  wedIsOpen: string = 'Otwarte';
  thuIsOpen: string = 'Otwarte';
  friIsOpen: string = 'Otwarte';
  satIsOpen: string = 'Zamknięte';
  sunIsOpen: string = 'Zamknięte';
  monFromControl = new FormControl({value : '7:00', disabled: false});
  monToControl = new FormControl({value : '16:00', disabled: false});
  tueFromControl = new FormControl({value : '7:00', disabled: false});
  tueToControl = new FormControl({value : '16:00', disabled: false});
  wedFromControl = new FormControl({value : '7:00', disabled: false});
  wedToControl = new FormControl({value : '16:00', disabled: false});
  thuFromControl = new FormControl({value : '7:00', disabled: false});
  thuToControl = new FormControl({value : '16:00', disabled: false});
  friFromControl = new FormControl({value : '7:00', disabled: false});
  friToControl = new FormControl({value : '16:00', disabled: false});
  satFromControl = new FormControl({value : '', disabled: true});
  satToControl = new FormControl({value : '', disabled: true});
  sunFromControl = new FormControl({value : '', disabled: true});
  sunToControl = new FormControl({value : '', disabled: true});

  // 
  // Custom hours opening
  // 
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  customEnabled = false;
  customIsOpen: string = 'Zamknięte';


  constructor(private authenticationService: AuthenticationService,
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

  changeFormControl(isEnable : boolean,from: FormControl, to: FormControl){
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
      this.changeFormControl(true,this.monFromControl, this.monToControl);
    } else {
      this.monEnabled = true;
      this.monIsOpen = "Otwarte";
      this.changeFormControl(false,this.monFromControl, this.monToControl);
    }
  }

  tueOpenClick() { 
    if (this.tueEnabled) {
      this.tueEnabled = false;
      this.tueIsOpen = "Zamknięte";
      this.changeFormControl(true,this.tueFromControl, this.tueToControl);
    } else {
      this.tueEnabled = true;
      this.tueIsOpen = "Otwarte";
      this.changeFormControl(false,this.tueFromControl, this.tueToControl);
    }
  }

  wedOpenClick() { 
    if (this.wedEnabled) {
      this.wedEnabled = false;
      this.wedIsOpen = "Zamknięte";
      this.changeFormControl(true,this.wedFromControl, this.wedToControl);
    } else {
      this.wedEnabled = true;
      this.wedIsOpen = "Otwarte";
      this.changeFormControl(false,this.wedFromControl, this.wedToControl);
    }
  }

  thuOpenClick() { 
    if (this.thuEnabled) {
      this.thuEnabled = false;
      this.thuIsOpen = "Zamknięte";
      this.changeFormControl(true,this.thuFromControl, this.thuToControl);
    } else {
      this.thuEnabled = true;
      this.thuIsOpen = "Otwarte";
      this.changeFormControl(false,this.thuFromControl, this.thuToControl);
    }
  }

  friOpenClick() { 
    if (this.friEnabled) {
      this.friEnabled = false;
      this.friIsOpen = "Zamknięte";
      this.changeFormControl(true,this.friFromControl, this.friToControl);
    } else {
      this.friEnabled = true;
      this.friIsOpen = "Otwarte";
      this.changeFormControl(false,this.friFromControl, this.friToControl);
    }
  }

  satOpenClick() { 
    if (this.satEnabled) {
      this.satEnabled = false;
      this.satIsOpen = "Zamknięte";
      this.changeFormControl(true,this.satFromControl, this.satToControl);
    } else {
      this.satEnabled = true;
      this.satIsOpen = "Otwarte";
      this.changeFormControl(false,this.satFromControl, this.satToControl);
    }
  }

  sunOpenClick() { 
    if (this.sunEnabled) {
      this.sunEnabled = false;
      this.sunIsOpen = "Zamknięte";
      this.changeFormControl(true,this.sunFromControl, this.sunToControl);
    } else {
      this.sunEnabled = true;
      this.sunIsOpen = "Otwarte";
      this.changeFormControl(false,this.sunFromControl, this.sunToControl);
    }
  }

  saveHoursOpening(){
    //TODO Zapisywanie wybranych dni i godzin defaultowe
  }

  customOpenClick(){

  }
}
