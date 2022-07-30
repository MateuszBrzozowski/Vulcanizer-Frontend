import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, HostListener, NgModule, OnInit } from '@angular/core';
import { NgModel, FormControl, Validators, FormGroup } from '@angular/forms';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Observable, zipAll } from 'rxjs';
import { Business } from './business';
import { BusinessService } from './business.service';
import { UserService } from './user.service';
import { User } from './users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal, NgModel],
})
export class AppComponent implements OnInit {
  title = 'vulcanizerapp';
  public users: User[] = [];
  public businesses: Business[] = [];
  closeResult = '';


  constructor(
    private userService: UserService,
    private businessService: BusinessService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private cookieService: CookieService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getRecommendBusiness();
    const name = sessionStorage.getItem('first-name');
    console.log(name);
    if (name !== null) {
      const login = document.getElementById("login-details");
      login?.classList.remove('hidden');
      const loginRegister = document.getElementById('login-button');
      loginRegister?.classList.add('hidden');
      
    }
  }

  onKeypress(event: any) {
    console.log(event);
    //(keypress)="onKeypress($event)"
  }

  /**
   * getRecommendBusiness
   */
  public getRecommendBusiness(): void {
    this.businessService.getRecommendBusiness().subscribe(
      (response: Business[]) => {
        this.businesses = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

    // this.emailForm.valueChanges.subscribe((value) => {
    //   this.validEmail(value);
    // });

    // if (this.emailForm.value?.length === 0
    //   || this.) {
    //   closeFunction();
    // } else {
    //   if (this.emailForm.invalid) {
    //     console.log('nie moge zamknacc okna bo dane są nie poprawne');
    //   } else {
    //     /// TODO - połączyc sie z backendem i niech sie dzieje magia
    //     closeFunction();
    //   }
    // }
  }
