import { HttpErrorResponse } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { NgModel, FormControl, Validators } from '@angular/forms';
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
  providers: [NgbModalConfig, NgbModal, NgModel],
})
export class AppComponent implements OnInit {
  title = 'vulcanizerapp';
  public users: User[] = [];
  public businesses: Business[] = [];
  closeResult = '';
  emailForm = new FormControl('',[Validators.email,Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]);

  constructor(
    private userService: UserService,
    private businessService: BusinessService,
    config: NgbModalConfig,
    private modalService: NgbModal
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

  registerTab() {
    let tabLogin = document.getElementById('tab-login');
    let tabRegister = document.getElementById('tab-register');
    let formLogin = document.getElementById('form-login');
    let formRegister = document.getElementById('form-register');

    tabLogin?.classList.remove('active');
    tabRegister?.classList.add('active');

    formLogin?.classList.add('hidden');
    formRegister?.classList.remove('hidden');
  }

  loginTab() {
    let tabLogin = document.getElementById('tab-login');
    let tabRegister = document.getElementById('tab-register');
    let formLogin = document.getElementById('form-login');
    let formRegister = document.getElementById('form-register');

    tabLogin?.classList.add('active');
    tabRegister?.classList.remove('active');

    formLogin?.classList.remove('hidden');
    formRegister?.classList.add('hidden');
  }

  login(closeFunction: any) {
    console.log('Logowanie - Brak polaczenia z backendem');
    this.emailForm.valueChanges.subscribe(value =>{this.validEmail(value)})

    if(this.emailForm.value?.length===0){
      closeFunction();
    }else{
      if(this.emailForm.invalid){
        console.log("nie moge zamknacc okna bo dane są nie poprawne")
      }else{
        /// TODO - połączyc sie z backendem i niech sie dzieje magia
        closeFunction();
      }
    }

  }

  validEmail(value:any){    
    let test = document.getElementById("loginName");
  }

  register(closeFunction: any) {
    console.log('Rejestrowanie użytkownika - brak połączenia z backendem');

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
