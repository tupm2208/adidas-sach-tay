import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  open() {

    let productKind = this.dialog.open(UploadComponent, {
      width: "80%",
      height:'90%'
    })

    productKind.afterClosed().subscribe( data => {

      console.log("close product kind!");
    })
  }

}
