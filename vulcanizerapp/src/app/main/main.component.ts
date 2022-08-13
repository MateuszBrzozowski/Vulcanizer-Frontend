import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Business } from '../business';

import { NgModule } from '@angular/core';
import { BusinessService } from '../service/business.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public businesses: Business[] = [];

  constructor(private businessService: BusinessService) {}

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
}
