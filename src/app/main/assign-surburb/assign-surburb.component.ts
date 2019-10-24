import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/util/loading.service';

import { UserService } from '../../core/api/user.service';
import { BillService } from '../../core/api/bill.service';
import { BillDetailService } from '../../core/api/bill-detail.service';
import { MainService } from '../../core/api/main.service';
import { PopupService } from '../../core/dialog/popup/popup.service';
import { StorageService } from '../../core/util/storage.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
declare var $: any;

@Component({
  selector: 'app-assign-surburb',
  templateUrl: './assign-surburb.component.html',
  styleUrls: ['./assign-surburb.component.css']
})
export class AssignSurburbComponent implements OnInit {

  myControl = new FormControl();

  listBooked = [];
  surburbData: any = {};
  name = name;
  options = [];
  selectedUser = null;
  filterUser = '';

  ps1 = null;

  constructor(
    private userService: UserService,
    private billService: BillService,
    private billDetailService: BillDetailService,
    private router: Router,
    private loadingService: LoadingService,
    private mainService: MainService,
    private popupService: PopupService,
    private storageService: StorageService
   ) { }

  ngOnInit() {

    this.surburbData = {
      brand: '',
      result: [],
      note: ''
    };

    this.options = [];

    this.myControl = new FormControl();

    this.loadingService.show();

    this.getListBill();

    this.userService.search(
      {
        role: 'shiper'
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

    this.billService.search({reservationId: null}).subscribe( data => {

      this.listBooked = data.data;
      this.listBooked.forEach(element => {
        delete element.receiveDate
      })

      console.log("book: ", this.listBooked);
      this.loadingService.hide();
    })
  }

  selectItem(item) {

    if(this.surburbData.brand &&  item.brand.toUpperCase().indexOf(this.surburbData.brand.toUpperCase()) == -1) {

      return;
    } else {

      this.surburbData.brand = item.brand;
    }

    item.reservationId = !item.reservationId;

    if(!item.reservationId) {

      this.surburbData.brand = '';
      this.checkAndSetTH();
    }

    console.log("item: ", item);
    item.billdetail.forEach(elem => {

      let flag = true;
      this.surburbData.result.forEach(element => {

        if (element.productId == elem.productId) {

          flag = false;
          if(item.reservationId) {

            element.quantity += elem.quantity;
            element.price = elem.price
            element.code = elem.code
            element.webFee = elem.webFee,
            element.link = elem.link
            // this.surburbData.yenAmount += elem.quantity * elem.price
            // console.log('yenAmount: ', this.surburbData.yenAmount)
            if (elem.keepBox) { //if customer want to keep box, add number of box to the reservationdetail
              element.keepBox += elem.quantity
            }
          } else {

            if(element.quantity == elem.quantity) {

              this.surburbData.result.splice(this.surburbData.result.indexOf(element), 1);
            } else {

              element.quantity -= elem.quantity;
              // this.surburbData.yenAmount -= elem.quantity * elem.price
              if (elem.keepBox) { //remove the number of boxes that we have just added above
                element.keepBox -= elem.quantity
              }
            }
          }
          return;
        }
      })

      if(flag) {
        // this.surburbData.yenAmount += elem.quantity * elem.price
        this.surburbData.result.push({
          productId: elem.productId,
          quantity: elem.quantity,
          keepBox: elem.keepBox? elem.quantity: 0,
          price: elem.price,
          code: elem.code,
          webFee: elem.webFee,
          link: elem.link
        })
      }
      
    })
  }

  refreshPage() {

    this.popupService.showSuccess().subscribe( () => {

      this.ngOnInit();
    })
  }

  selectAll() {

    let flag = true; // == false mean we have to select all, == true mean otherwise

    let th = this.surburbData.brand;

    this.listBooked.forEach( element => {

      if(!element.reservationId && th && element.brand.toUpperCase().indexOf(th.toUpperCase()) != -1) {

        flag = false;
        return;
      }
    })

    this.listBooked.forEach( element => {

      if(element.brand.toUpperCase().indexOf(th.toUpperCase()) == -1) return;
      if(flag) { 

        this.selectItem(element);
      } else {

        if(!element.reservationId) {
          
          this.selectItem(element);
        }
      }
    })
  }

  checkBeforeOrder() {

    if(!this.selectedUser) return false;
    console.log("user pass: ", this.selectedUser)

    if(!this.surburbData.result.length) return false;

    console.log("order pass", this.surburbData.result)
    // if(!this.surburbData.id) return false;

    return true;
  }

  checkAndSetTH() {

    this.listBooked.forEach( element => {

      if(element.reservationId) {

        this.surburbData.brand = element.brand;
        return;
      }
    })
  }

  submit() {

    this.loadingService.show();

    if(!this.checkBeforeOrder()) {

      this.popupService.showError("Thông tin không đúng, xin điền lại");
      this.loadingService.hide();
      return;
    }

    this.surburbData.userId = this.selectedUser.id;
    this.surburbData.status = 3;
    this.surburbData.createdDate = new Date();
    
  }
}
