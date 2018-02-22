import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ProductKindComponent } from './product-kind/product-kind.component';
import { FirmComponent } from './firm/firm.component';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UploadComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onClick() {

    this.dialogRef.close();
  }

  openAddProductKind() {

    let productKind = this.dialog.open(ProductKindComponent, {
      width: '90%',
      height: '90%'
    })

    productKind.afterClosed().subscribe( data => {

      console.log("close product kind!");
    })
  }

  openAddFirm() {

    let productKind = this.dialog.open(FirmComponent, {
      width: '90%',
      height: '90%'
    })

    productKind.afterClosed().subscribe(data => {

      console.log("close firm!");
    })
  }
}
