import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompanyBranchResponse } from '../business';
import { AuthenticationService } from '../service/authentication.service';
import { PanelsComponent } from '../user-managment/panels/panels.component';
import { UserService } from '../user.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BranchManagmentComponent } from './branch-managment/branch-managment.component';

@Component({
  selector: 'app-business-managment',
  templateUrl: './business-managment.component.html',
  styleUrls: ['./business-managment.component.css'],
  providers : [],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class BusinessManagmentComponent implements OnInit, AfterViewInit {

  columnsToDisplay: string[] = ['nip','companyName','companyBranchName','action'];
  public companyBranches: CompanyBranchResponse[] = new Array<CompanyBranchResponse>;
  dataSource = new MatTableDataSource(this.companyBranches);

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private userService : UserService) { }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    if(this.userService.isCompanyActive()){
      this.companyBranches = this.userService.getOnlyActiveCompanyBranchesFromLocalStorage();
      this.refreshTable();
    }else {
      this.router.navigateByUrl('');
    }
  }
  
    
  refreshTable() {
    this.dataSource = new MatTableDataSource(this.companyBranches);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    const panelBizBtn = document.getElementById('panel-biz');
    panelBizBtn?.classList.add('btn-menu-active');
  }

  goToBusinessBranch(button : HTMLButtonElement){
    console.log(button.value);
    localStorage.setItem('selectedCompanyBranch',button.value)
    this.router.navigateByUrl('/business/branch');
  }

}
