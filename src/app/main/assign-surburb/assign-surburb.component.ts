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
  selectedUser = null;
  filterUser = '';
  resultList = []
  note = ''

  ps1 = null;

  constructor(
    private userService: UserService,
    private billService: BillService,
    private loadingService: LoadingService,
    private popupService: PopupService,
    private formatService: FormatService,
    private surburbShipService: SurburbShipService
   ) { }

  ngOnInit() {

    this.options = [];

    this.myControl = new FormControl();

    this.loadingService.show();

    this.getListBill();

    this.userService.search(
      {
        role: 'suburbShiper'
      }
    ).subscribe( data => {
      
      this.options = data.data;
    })

    this.subcribeUser();
  }

  subcribeUser() {

    this.myControl.valueChanges.subscribe( data => {

      this.filterUser = data;

      for(let i = 0; i < this.options.length; i++) {

        if(this.options[i].name == data) {

          this.selectedUser = this.options[i];

          return;
        }
      }

      this.selectedUser = null;
    })
  }

  getListBill() {

    this.billService.search({status: 5}).subscribe( data => {

      this.listBooked = data.data;
      this.listBooked.forEach(element => {
        delete element.receiveDate
      })

      console.log("book: ", this.listBooked);
      this.loadingService.hide();
    })
  }

  selectItem(item) {

    const index = this.resultList.indexOf(item)
    if (index == -1) {
      this.resultList.push(item)
    } else {
      this.resultList.splice(index, 1)
    }
  }

  refreshPage() {

    this.popupService.showSuccess().subscribe( () => {

      this.ngOnInit();
    })
  }

  submit() {
    if(!this.selectedUser) {
      this.popupService.showError("Xin hãy chọn shiper");
      return
    }

    if(!this.resultList.length) {
      this.popupService.showError("Xin hãy chọn đơn hàng");
      return
    }
    this.loadingService.show();
    this.resultList.forEach(element => {
      element.userId = this.selectedUser.id
      element.billId = element.id
      if (!element.note) {
        delete element.note
      }
      element.remainingMoney = this.formatService.calculateTotalBill(element) - element.shipFee - element.deposit
      if (!element.supplementalShip) {
        element.supplementalShip = 0
      }
      element.phone = element.user.phone
      element.receiverName = element.user.name
      element.address = element.user.detailAddress + ' ' + element.user.generalAddress
      element.createdDate = new Date()
      element.status = 6
      delete element.id
    })

    let count = 0

    this.resultList.forEach( element => {
      this.surburbShipService.create(element).subscribe( data => {
        console.log("created ok:", data.id)
      })
      this.billService.update({id: element.billId, status: 6}).subscribe(bill => {
        count += 1
        if(count == this.resultList.length) {
          this.loadingService.hide()
          this.refreshPage()
        }
      }, error => {
        count += 1
        if (count == this.resultList.length) {
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
