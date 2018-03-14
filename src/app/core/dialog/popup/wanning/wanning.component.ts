import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-wanning',
  templateUrl: './wanning.component.html',
  styleUrls: ['./wanning.component.css']
})
export class WanningComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<WanningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }
}
