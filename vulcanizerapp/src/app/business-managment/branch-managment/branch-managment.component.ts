import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CompanyBranchResponse } from 'src/app/business';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/user.service';
import { StandAddComponent } from './stand/stand-add/stand-add.component';

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
  displayColumnsStand = ['Numer','Akcja'];
  dataSourceStand = new Array<any>;
  

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) { }

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

  setViewServices() {
    this.setViewHidden();
    this.viewServices = true;
  }

  standAdd(){
    const dialogRef = this.dialog.open(StandAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
