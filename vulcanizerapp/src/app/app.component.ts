import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { Business } from './business';
import { BusinessService } from './business.service';
import { UserService } from './user.service';
import { User } from './users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbModalConfig, NgbModal],
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
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getRecommendBusiness();
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

  /**
   * getUsers
  :void   */
  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  open(content: any) {
    this.modalService.open(content);
  }

  registerTab(){
    let tabLogin = document.getElementById("tab-login");
    let tabRegister = document.getElementById("tab-register");
    tabLogin?.classList.remove("active");
    tabRegister?.classList.add("active");

  }

  loginTab(){
    let tabLogin = document.getElementById("tab-login");
    let tabRegister = document.getElementById("tab-register");
    tabLogin?.classList.add("active");
    tabRegister?.classList.remove("active");
  }

  login(closeFunction: any){
    console.log("Logowanie - Brak polaczenia z backendem")
    
    closeFunction();
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
