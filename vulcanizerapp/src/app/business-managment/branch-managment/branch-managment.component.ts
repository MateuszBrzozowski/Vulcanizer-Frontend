import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
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
  viewStand: boolean = true;
  viewServices: boolean = false;

  // 
  // List of Stand
  // 
  displayColumnsStand = ['Numer', 'Akcja'];
  sourceStand: Stand[] = this.businessService.getSavedStands();
  @ViewChild(MatTable) table!: MatTable<Stand>;
  dataSourceStand = new MatTableDataSource(this.sourceStand);

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
    private businessService: BusinessService,
    private notification: NotificationService) { }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;

  ngOnInit(): void {
    this.isAvailable();
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

  standRemove(btnRemove: HTMLButtonElement){
    const dialogRef = this.dialog.open(StandRemoveComponent, {data : btnRemove.value});
    dialogRef.afterClosed().subscribe(result => {
      if(result === true){
        this.businessService.standRemove(this.usersCompanyBranch.id,btnRemove.value).subscribe({
          next: (response) => {
            if (response.body === null) {
              return;
            }
            this.sourceStand = response.body;
            this.refreshTable();
          },
          error : (error) => {
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
}
