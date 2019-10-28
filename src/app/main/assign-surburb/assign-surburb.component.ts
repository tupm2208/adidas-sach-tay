import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../core/util/loading.service';

import { UserService } from '../../core/api/user.service';
import { BillService } from '../../core/api/bill.service';
import { PopupService } from '../../core/dialog/popup/popup.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { FormatService } from '../../core/util/format.service';
import { SurburbShipService } from '../../core/api/surburb-ship.service';
import { DialogService } from '../../core/dialog/dialog.service';
declare var $: any;

@Component({
  selector: 'app-assign-surburb',
  templateUrl: './assign-surburb.component.html',
  styleUrls: ['./assign-surburb.component.css']
})
export class AssignSurburbComponent implements OnInit {

  myControl = new FormControl();

  listBooked = [];
  name = name;
  options = [];
  note = ''

  ps1 = null;

  constructor(
    private billService: BillService,
    private loadingService: LoadingService,
    private popupService: PopupService,
    private formatService: FormatService,
    private surburbShipService: SurburbShipService,
    private dialogService: DialogService
   ) { }

  ngOnInit() {

    this.options = [];

    this.loadingService.show();

    this.getListBill();

  }

  getListBill() {

    this.billService.search({status: 5}).subscribe( data => {

      this.listBooked = data.data;
      this.listBooked.forEach(element => {
        // delete element.receiveDate
        element.billId = element.id
        element.quantity = this.getPropSum(element, 'quantity')
        element.remainingMoney = this.formatService.calculateTotalBill(element) - element.deposit
        element.routeType = 0
        element.receiverName = element.user.name
        element.receiverPhone = element.user.phone
        element.generalAddress = element.user.generalAddress
        element.detailAddress = element.user.detailAddress
        element.isNightShip = 1
        element.freeShip = 1
        element.premiumValue = 0
        element.isGetNight = 0
        element.seperatedCode = ''
        element.productName = ''
        element.status = 6
        delete element.id
      })

      console.log("book: ", this.listBooked);
      this.loadingService.hide();
    })
  }

  edit(item) {
    this.dialogService.openSurburbShip(item)
  }

  getPropSum(item, prop) {
    let s = 0
    item.billdetail.forEach(element => {
      s += element[prop]
    });

    return s
  }

  removeItem(item) {
    let index = this.listBooked.indexOf(item)
    this.listBooked.splice(index, 1)
  }

  refreshPage() {

    this.popupService.showSuccess().subscribe( () => {

      this.ngOnInit();
    })
  }

  submit() {

    this.loadingService.show();
    this.listBooked.forEach(element => {
      
    })

    let count = 0

    this.listBooked.forEach( element => {
      element.createdDate = new Date()
      this.surburbShipService.create(element).subscribe( data => {
        console.log("created ok:", data.id)
      })
      this.billService.update({id: element.billId, status: 6}).subscribe(bill => {
        count += 1
        if(count == this.listBooked.length) {
          this.loadingService.hide()
          this.refreshPage()
        }
      }, error => {
        count += 1
        if (count == this.listBooked.length) {
          this.loadingService.hide()
        }
        this.popupService.showError("Có lỗi xảy ra!")
      })
    })
  }

  replaceCommas(event) {
    return Number(event.replace(/,/g, ""))
  }
}
