import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BillComponent } from './bill/bill.component';

import { DialogService } from '../../core/dialog/dialog.service';
import { BillService } from '../../core/api/bill.service';
import { BillDetailService } from '../../core/api/bill-detail.service';
import { UserService } from '../../core/api/user.service';
import { LoadingService } from '../../core/util/loading.service';
import { FormatService } from '../../core/util/format.service';
import { MainService } from '../../core/api/main.service';
import { StorageService } from '../../core/util/storage.service';

declare var $: any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  private name = '';
  private reservationId = '';
  private from: any = '';
  private to: any = '';
  private sr = true;

  private fakedData = [];

  constructor(
    private dialog: MatDialog,
    private billService: BillService,
    private billDetailService: BillDetailService,
    private userService: UserService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private formatService: FormatService,
    private mainService: MainService,
    private storageService: StorageService
  ) { }

  ngOnInit() {

    this.sr = screen.width <= 412? false: true;

    this.loadingService.show();

    this.getListBills();
  }

  getListBills() {

    this.billService.list().subscribe( data => {
      this.fakedData = data.data
      
      this.fakedData.forEach(item => {
        this.calculate(item)
      })
      this.loadingService.hide()
      console.log(data)
    }, error => {
      this.loadingService.hide()
      console.log("error: ", error)
    })
  }

  openAddProductKind(item) {

    let productKind = this.dialog.open(BillComponent, {
      height: "80%",
      width: "80%",
      data: item
    })

    productKind.afterClosed().subscribe( data => {

      console.log("data close");
    })
  }

  order(item) {

    this.dialogService.openBill({user: item.user}).subscribe( data => {

      console.log("data order: ", data);
    })
  }

  openBill(item) {

    if(item.reservationId) this.dialogService.gotoOrder(item.reservationId).subscribe( data => {

      this.mainService.listBill({id: item.id}).subscribe( listItem => {

        let index = this.fakedData.indexOf(item);

        this.fakedData.splice(index, 1, listItem[0]);
        this.fakedData = this.fakedData.concat([]);
      })
    });
  }

  update(item) {

    this.dialogService.openBill({user: item.user, bill: item}).subscribe( data => {

      if(!item.billdetail.length) {

        this.fakedData.splice(this.fakedData.indexOf(item), 1);

        this.fakedData = this.fakedData.concat([]);
        this.loadingService.show()
        this.billService.delete(item.id).subscribe(success => {
          console.log("deleted: ", data)
          this.loadingService.hide()
        }, error => {
          console.log("failed: ", error)
          this.loadingService.hide()
        })
      }
    })
  }

  calculate(item) {
    let sum = 0;
    item.billdetail.forEach( element => {

      sum += element.price *  item.tradeDiscount * element.quantity;
    });

    item.total =  sum * item.exchangeRate - -item.shipFee - -item.surcharge;
  }
}
