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
      data.user = item.user
      this.fakedData.push(data)
      this.fakedData = this.fakedData.concat([])
    })
  }

  openBill(item) {
    if(item.reservationId) this.dialogService.gotoOrder(item.reservationId).subscribe( status => {

      this.billService.search({id: item.id, include: true}).subscribe( listItem => {

        let index = this.fakedData.indexOf(item);

        this.fakedData.splice(index, 1, listItem.data[0]);
        this.calculate(listItem.data[0])
        if(status == 3 || status == 4) { // the reservation isn't deleted
          this.billService.update_status({status: status}, item.id).subscribe(list => {
            this.fakedData.forEach(element => {
              list.forEach(ele => {
                if(ele.id == element.id) {
                  element.status = ele.status
                }
              })
            })
          })
        }
        this.fakedData = this.fakedData.concat([]);
      })
    });
  }

  update(item) {
    const passData = {user: item.user, bill: JSON.parse(JSON.stringify(item))}
    this.dialogService.openBill(passData).subscribe( data => {
      let orderNum = this.fakedData.indexOf(item)
      if(!passData.bill.billdetail.length) {

        this.fakedData.splice(orderNum, 1);

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
      if (data == -2) {
        this.fakedData.splice(orderNum, 1)
        this.fakedData = this.fakedData.concat([])
      }
      else {
        this.billService.search({id: item.id}).subscribe(billList => {
          if(billList.total > 0) {
            this.fakedData.splice(orderNum, 1, billList.data[0]);
            this.fakedData = this.fakedData.concat([]);
          }
        }, error => {
          console.log('error get new data: ', error)
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
