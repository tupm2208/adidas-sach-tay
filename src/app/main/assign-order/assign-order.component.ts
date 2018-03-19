import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/util/loading.service';

import { UserService } from '../../core/api/user.service';
import { BillService } from '../../core/api/bill.service';
import { OrderService } from '../../core/api/order.service';
import { OrderDetailService } from '../../core/api/order-detail.service';
import { BillDetailService } from '../../core/api/bill-detail.service';
import { MainService } from '../../core/api/main.service';
import { PopupService } from '../../core/dialog/popup/popup.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
declare var $: any;

@Component({
  selector: 'app-assign-order',
  templateUrl: './assign-order.component.html',
  styleUrls: ['./assign-order.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AssignOrderComponent implements OnInit {

  myControl = new FormControl();

  listBooked = [];
  orderData: any = {};
  name = name;
  options = [];
  selectedUser = null;
  filterUser = '';

  ps1 = null;

  constructor(
    private userService: UserService,
    private billService: BillService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private billDetailService: BillDetailService,
    private router: Router,
    private loadingService: LoadingService,
    private mainService: MainService,
    private popupService: PopupService
   ) { }

  ngOnInit() {

    this.orderData = {};
    this.orderData.result = [];

    this.options = [];

    this.myControl = new FormControl();

    this.loadingService.show();

    this.getListBill();

    this.userService.search({maloainv: 4}).subscribe( data => {
      
      this.options = data;
    })

    this.subcribeUser();
  }

  subcribeUser() {

    this.myControl.valueChanges.subscribe( data => {

      this.filterUser = data;

      for(let i = 0; i < this.options.length; i++) {

        if(this.options[i].tenkh == data) {

          this.selectedUser = this.options[i];

          return;
        }
      }

      this.selectedUser = null;
    })
  }

  getListBill() {

    this.mainService.listBill({madh: null}).subscribe( data => {

      this.listBooked = data;

      console.log("book: ", this.listBooked);
      this.loadingService.hide();
    })
  }

  selectItem(item) {

    item.madh = !item.madh;

    console.log("item: ", item);
    item.chitiethds.forEach(elem => {

      let flag = true;
      this.orderData.result.forEach(element => {

        if (element.masp == elem.masp) {

          flag = false;
          if(item.madh) {

            element.soluong += elem.soluong;
            element.giuhop += elem.giuhop;
          } else {

            if(element.soluong == elem.soluong) {

              this.orderData.result.splice(this.orderData.result.indexOf(element), 1);
            } else {

              element.soluong -= elem.soluong;
              element.giuhop -= elem.giuhop;
            }
          }
          return;
        }
      })

      if(flag) {

        this.orderData.result.push({
          masp: elem.masp,
          soluong: elem.soluong,
          giuhop: elem.giuhop
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

    let flag = true;

    this.listBooked.forEach( element => {

      if(!element.madh) {

        flag = false;
        return;
      }
    })

    this.listBooked.forEach( element => {

      if(flag) {

        this.selectItem(element);
      } else {

        if(!element.madh) {
          
          this.selectItem(element);
        }
      }
    })
  }

  checkBeforeOrder() {

    if(!this.selectedUser) return false;

    if(!this.orderData.result.length) return false;

    if(!this.orderData.madh) return false;

    return true;
  }

  submit() {

    this.loadingService.show();

    if(!this.checkBeforeOrder()) {

      this.popupService.showError();
      this.loadingService.hide();
      return;
    }

    this.orderData.makh = this.selectedUser.makh;
    this.orderData.trangthai = 2;
    this.orderData.ngay = new Date().getTime();
    this.orderService.create(this.orderData).subscribe( data => {

      console.log("return data: ", data);

      let i = 0;

      this.listBooked.forEach( element => {

        if(element.madh) {

          element.madh = data.data.madh;
          element.trangthai = 2;

          this.billService.update(element).subscribe( data => {

            i++
            console.log("create ok: ", data);

            if (i == this.orderData.result.length + this.listBooked.length) {

              this.loadingService.hide();
              this.refreshPage();
            }
          }, error => {

            element.madh = null;
            element.trangthai = 1;
          })
        } else {

          i++;
        }
      })

      this.orderData.result.forEach( element => {

        element.madh = data.data.madh;
        element.makh = this.selectedUser.makh;

        this.orderDetailService.create(element).subscribe( data => {

          i++;
          
          if(i == this.orderData.result.length + this.listBooked.length) {

            this.loadingService.hide();
            this.refreshPage();
          }
        })
      })
    }, error => {

      this.loadingService.hide();
      this.popupService.showError();
    })
  }
}