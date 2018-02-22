import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-product-kind',
  templateUrl: './product-kind.component.html',
  styleUrls: ['./product-kind.component.css']
})
export class ProductKindComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ProductKindComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

}
