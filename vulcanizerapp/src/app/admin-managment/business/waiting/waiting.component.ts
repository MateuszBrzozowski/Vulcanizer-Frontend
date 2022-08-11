import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserCompanyBranch } from 'src/app/business';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  columnsToDisplay: string[] = ['position','name', 'status', 'action'];
  public businesses: UserCompanyBranch[] = new Array<UserCompanyBranch>;
  dataSource: MatTableDataSource<UserCompanyBranch> | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.authenticationService.isAdmin()) {
      this.router.navigateByUrl('');
    }
    this.getAllWaitingBusiness();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();

    if (this.dataSource!.paginator) {
      this.dataSource!.paginator.firstPage();
    }
  }

  getAllWaitingBusiness() {
    throw new Error('Method not implemented.');
  }
}
