import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BillComponent } from './bill/bill.component';
import { BillService } from '../../core/api/bill.service';
import { BillDetailService } from '../../core/api/bill-detail.service';
import { UserService } from '../../core/api/user.service';
declare var $: any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  private tenkh = '';
  private makh = '';

  private fakedData = [];

  constructor(
    private dialog: MatDialog,
    private billService: BillService,
    private billDetailService: BillDetailService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.billService.list().subscribe( data => {

      console.log("bill List: ", data);
      
      this.fakedData = data;
      this.fakedData.forEach(element => {
        
        this.userService.getById(element.makh).subscribe( user => {

          element.tenkh = user.data.tenkh,
          element.sdt = user.data.sdt
        })

        this.billDetailService.getByParams({mahd: element.mahd}).subscribe( ct => {

          element.listProduct = ct;
        })
      });
    });
  }

  openAddProductKind() {

    let productKind = this.dialog.open(BillComponent, {
      height: "80%"
    })

    productKind.afterClosed().subscribe( data => {

      console.log("close product kind!");
    })
  }

  ngAfterViewInit() {

    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);
  }
}
