import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyBranchResponse } from 'src/app/business';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.css'],
})
export class PanelsComponent implements OnInit, AfterViewInit {
  hasActiveCompany: boolean = false;
  usersCompanyBranches : CompanyBranchResponse[] = new Array<CompanyBranchResponse>; 

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.setActiveBtn();
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.userService.getUserCompanyBranch().subscribe({
        next: (response) => {
          if (response.body == null) {
            return;
          }
          for (let index = 0; index < response.body.length; index++) {
            let userCompanyBranch = response.body[index];
            userCompanyBranch.noId = index + 1;
            userCompanyBranch.isPanelDisable = true;
            if (userCompanyBranch.companyBranchStatus === 'NOT_ACTIVE') {
              userCompanyBranch.statusClass = 'badge-warning';
              userCompanyBranch.companyBranchStatus = 'Oczekujący';
            } else if (userCompanyBranch.companyBranchStatus === 'ACTIVE') {
              userCompanyBranch.statusClass = 'badge-success';
              userCompanyBranch.companyBranchStatus = 'Aktywny';
              userCompanyBranch.isPanelDisable = false;
            } else if (userCompanyBranch.companyBranchStatus === 'LOCKED') {
              userCompanyBranch.statusClass = 'badge-danger';
              userCompanyBranch.companyBranchStatus = 'Zablokowany';
            } else if (userCompanyBranch.companyBranchStatus === 'CLOSED') {
              userCompanyBranch.statusClass = 'badge-danger';
              userCompanyBranch.companyBranchStatus = 'Zamknięty';
            } else {
              userCompanyBranch.statusClass = 'badge-danger';
              userCompanyBranch.companyBranchStatus = 'Odrzucony';
            }
          }
          this.usersCompanyBranches = response.body;
          
          if(response.body.length>0){
            this.hasActiveCompany = true;
            this.addCompanyBranchesToLocalStorage();
          }else {
            this.hasActiveCompany = false;
          }
        },
      });
    }
  }

  addCompanyBranchesToLocalStorage(){
    localStorage.setItem('compBranches',JSON.stringify(this.usersCompanyBranches));
  }

  setActiveBtn() {
    if (this.authenticationService.isCompanyActive()) {
      const panelBizBtn = document.getElementById('panel-biz');
      panelBizBtn?.classList.add('btn-menu-active');
    }
  }

  openBusinessManagment() {
    this.router.navigateByUrl('/busienss');
  }
}
