import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogInfo } from './dialogInfo';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogInfo) { }

  ngOnInit(): void {
  }

}
