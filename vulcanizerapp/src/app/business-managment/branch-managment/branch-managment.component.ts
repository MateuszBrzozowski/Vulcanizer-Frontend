import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CompanyBranchResponse } from 'src/app/business';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-branch-managment',
  templateUrl: './branch-managment.component.html',
  styleUrls: ['./branch-managment.component.css']
})
export class BranchManagmentComponent implements OnInit {
  usersCompanyBranches: CompanyBranchResponse[] = new Array<CompanyBranchResponse>;
  usersCompanyBranch: CompanyBranchResponse = new CompanyBranchResponse;
  public branchId!: number; 

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) { }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      if (this.userService.isCompanyActive()) {
        this.usersCompanyBranches = this.userService.getOnlyActiveCompanyBranchesFromLocalStorage();
        if (this.usersCompanyBranches.length > 1){
          const selectedId = this.userService.getSelectedCompanyBranchId();
          for (let i = 0; i < this.usersCompanyBranches.length; i++) {
            const element = this.usersCompanyBranches[i];
            if(element.id == selectedId){
              this.usersCompanyBranch = element;
            }
          }
          console.log(this.usersCompanyBranch);
        } else if (this.usersCompanyBranches.length === 1) {
          this.usersCompanyBranch = this.usersCompanyBranches[0];
          console.log(this.usersCompanyBranch);
          
        } else {
          this.router.navigateByUrl('');
        }
      } else {
        this.router.navigateByUrl('');
      }
    }
  }

  check(){
    
  }

}
