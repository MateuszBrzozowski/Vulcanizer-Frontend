import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.css'],
})
export class PanelsComponent implements OnInit {
  hasActiveCompany: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.userService.hasActiveCompanyBranch().subscribe({
        next: (response) => {
          if (response == true) {
            localStorage.setItem('isCompany', 'true');
            this.hasActiveCompany = true;
          } else {
            localStorage.setItem('isCompany', 'false');
            this.hasActiveCompany = false;
          }
        },
      });
    }
  }

  openBusinessManagment() {
    this.router.navigateByUrl('/busienss');
  }
}
