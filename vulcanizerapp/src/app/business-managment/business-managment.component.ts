import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-business-managment',
  templateUrl: './business-managment.component.html',
  styleUrls: ['./business-managment.component.css']
})
export class BusinessManagmentComponent implements OnInit {

  constructor() { }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger | undefined;

  ngOnInit(): void {
    //check has user active company
  }

}
