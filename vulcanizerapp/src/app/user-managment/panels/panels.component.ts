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
      if (this.userService.getCompanyBranchesFromLocalStorage().length > 0) {
        this.hasActiveCompany = true;
      } else {
        this.hasActiveCompany = false;
      }
    }
  }

  setActiveBtn() {
    if (this.userService.isCompanyActive()) {
      const panelBizBtn = document.getElementById('panel-biz');
      panelBizBtn?.classList.add('btn-menu-active');
    }
  }

  openBusinessManagment() {
    this.router.navigateByUrl('/busienss');
  }
}
