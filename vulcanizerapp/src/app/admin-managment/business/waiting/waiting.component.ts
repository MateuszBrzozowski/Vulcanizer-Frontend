import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { CompanyBranchResponse, UserCompanyBranch } from 'src/app/business';
import { NotificationType } from 'src/app/enum/notification-type.enum';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { NotificationService } from 'src/app/service/notification.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BusinessService } from 'src/app/service/business.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class WaitingComponent implements OnInit {

  tableIsVisable: boolean = true;


  columnsToDisplay: string[] = ['name'];
  public companyBranches: CompanyBranchResponse[] = new Array<CompanyBranchResponse>;
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: CompanyBranchResponse | null;
  dataSource = new MatTableDataSource(this.companyBranches);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private busienssService: BusinessService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (!this.authenticationService.isAdmin()) {
      this.router.navigateByUrl('');
    }
    this.getAllWaitingBusiness();

  }

  getAllWaitingBusiness() {
    this.busienssService.getAllWaitnigCompanyBranch().subscribe(
      (response) => {
        if (response.body == null) {
          this.notificationService.notify(NotificationType.INFO, "Brak biznesów do zaakceptowania!")
          return;
        }
        for (let index = 0; index < response.body.length; index++) {
          const element = response.body[index];
          element.noId = index;
          element.companyBranchStatus = "Oczekuje"
          element.statusClass = "badge-warning"
        }
        this.companyBranches = response.body;
        this.refreshTable();
      },
      (error) => {

      }
    )
  }

  accept(btnAccept: HTMLButtonElement, btnDecline: HTMLButtonElement) {
    const element = this.companyBranches[+btnAccept.value];
    this.busienssService.accept(element.id).subscribe(
      {
        next: () => {
          btnAccept.disabled = true;
          btnDecline.disabled = true;
          element.companyBranchStatus = 'Zaakceptowany';
          element.statusClass = 'badge-success';
          this.refreshTable();
        },
        error: () => {
          this.notificationService.notify(NotificationType.ERROR, "Coś poszło nie tak.");
        }
      }
    );
  }

  decline(btnAccept: HTMLButtonElement, btnDecline: HTMLButtonElement) {
    const element = this.companyBranches[+btnAccept.value];
    this.busienssService.decline(element.id).subscribe(
      {
        next: () => {
          btnAccept.disabled = true;
          btnDecline.disabled = true;
          element.companyBranchStatus = 'Odrzucony';
          element.statusClass = 'badge-danger';
          this.refreshTable();
        },
        error: () => {
          this.notificationService.notify(NotificationType.ERROR, "Coś poszło nie tak.");
        }
      }
    )
    // this.busienssService.decline(element.id).subscribe(
    //   (response) => {
    //     btnAccept.disabled = true;
    //     btnDecline.disabled = true;
    //     element.status = 'Odrzucony';
    //     element.statusClass = 'badge-danger';
    //     this.refreshTable();
    //   },
    //   (error) => {
    //     this.notificationService.notify(NotificationType.ERROR, "Coś poszło nie tak.");
    //   }
    // );

  }

  refreshTable() {
    this.dataSource = new MatTableDataSource(this.companyBranches);
    this.dataSource.paginator = this.paginator;
  }




  applyFilter(input: HTMLInputElement) {
    this.dataSource.filterPredicate = (data: CompanyBranchResponse, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
    const filterValue = input.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
