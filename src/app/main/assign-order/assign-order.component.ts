import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelectProductComponent } from './select-product/select-product.component';

import { UserService } from '../../core/api/user.service';
import { BillService } from '../../core/api/bill.service';
import { OrderService } from '../../core/api/order.service';
import { OrderDetailService } from '../../core/api/order-detail.service';
import { BillDetailService } from '../../core/api/bill-detail.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
declare var $: any;

@Component({
  selector: 'app-assign-order',
  templateUrl: './assign-order.component.html',
  styleUrls: ['./assign-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssignOrderComponent implements OnInit {

  myControl = new FormControl();

  listBooked = [];
  result = [];

  data: any = {};

  name = name;
  options = [];

  selectedUser = null;

  filterUser = '';

  ps1 = null;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private billService: BillService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private billDetailService: BillDetailService
   ) { }

  ngOnInit() {

    this.billService.search({madh: null}).subscribe( data => {

      console.log("data bill Service: ", data);
      this.listBooked = data;

      this.listBooked.forEach( element => {

        this.userService.getById(element.makh).subscribe ( user => {

          console.log("user :", element.makh, user);
          element.user = user.data;
        });

        this.billDetailService.getByParams({mahd: element.mahd}).subscribe ( bills => {

          console.log("bills: ", bills);
          element.bills = bills;
        })
      })

      console.log("final data: ", this.listBooked);
    })

    this.userService.search({maloainv: 4}).subscribe( data => {
      
      console.log("user data: ", data);
      this.options = data;
    })

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

  openAddProductKind() {

    console.log("open");

    let productKind = this.dialog.open(SelectProductComponent);

    productKind.afterClosed().subscribe(data => {

      console.log("close product kind!");
    })
  }

  selectItem(item) {

    item.madh = !item.madh;

    console.log("item: ", item);
    item.bills.forEach(elem => {

      let flag = true;
      this.result.forEach(element => {

        if (element.masp == elem.masp) {

          flag = false;
          if(item.madh) {

            element.soluong += elem.soluong;
            element.giuhop += elem.giuhop;
          } else {

            if(element.soluong == elem.soluong) {

              this.result.splice(this.result.indexOf(element), 1);
            } else {

              element.soluong -= elem.soluong;
              element.giuhop -= elem.giuhop;
            }
          }
          return;
        }
      })

      if(flag) {

        this.result.push({
          masp: elem.masp,
          soluong: elem.soluong,
          giuhop: elem.giuhop
        })
      }
      
    })

    console.log("result: ", this.result);
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

    if(!this.result.length) return false;

    return true;
  }

  submit() {

    if(!this.checkBeforeOrder()) return;

    this.data.makh = this.selectedUser.makh;
    this.orderService.create(this.data).subscribe( data => {

      console.log("return data: ", data);

      this.listBooked.forEach( element => {

        if(element.madh) {

          element.madh = data.data.madh;

          this.billService.update(element).subscribe( data => {

            console.log("create ok: ", data);
          })
        }
      })

      this.result.forEach( element => {

        element.madh = data.data.madh;
        element.makh = this.selectedUser.makh;

        this.orderDetailService.create(element).subscribe( data => {

          console.log("orderDetailService: ", data);
        })
      })
    })
  }
}