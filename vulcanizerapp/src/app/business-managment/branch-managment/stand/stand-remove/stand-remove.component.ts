import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StandAddComponent } from '../stand-add/stand-add.component';

@Component({
  selector: 'app-stand-remove',
  templateUrl: './stand-remove.component.html',
  styleUrls: ['./stand-remove.component.css'],
})
export class StandRemoveComponent implements OnInit {
  numberOfStand: number = 0;

  constructor(
    public dialogRef: MatDialogRef<StandRemoveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {}

  ngOnInit(): void {}
}
