import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-admin-managment',
  templateUrl: './admin-managment.component.html',
  styleUrls: ['./admin-managment.component.css'],
})
export class AdminManagmentComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authenticationService.isAdmin()) {
      this.router.navigateByUrl('');
    }
  }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;
}
