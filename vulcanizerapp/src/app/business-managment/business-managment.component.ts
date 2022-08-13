import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { PanelsComponent } from '../user-managment/panels/panels.component';

@Component({
  selector: 'app-business-managment',
  templateUrl: './business-managment.component.html',
  styleUrls: ['./business-managment.component.css'],
  providers : [PanelsComponent]
})
export class BusinessManagmentComponent implements OnInit, AfterViewInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private panelComponent : PanelsComponent) { }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;

  ngOnInit(): void {
    if(!this.authenticationService.isCompanyActive()){
      this.router.navigateByUrl('');
    }
    
  }

  ngAfterViewInit() {
    const panelBizBtn = document.getElementById('panel-biz');
    panelBizBtn?.classList.add('btn-menu-active');
  }

}
