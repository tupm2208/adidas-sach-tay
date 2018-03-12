import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { OrderService } from '../../core/api/order.service';
import { OrderDetailService } from '../../core/api/order-detail.service';
import { UserService } from '../../core/api/user.service';
import { LoadingService } from '../../core/util/loading.service';
import { FormatService } from '../../core/util/format.service';
declare var $: any;

import { OrderComponent } from './order/order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private tendh = '';
  private tenkh = '';
  private listUser = [];
  private fakedData = [];
  private from: any;
  private to: any;
  private sr = true;

  constructor(
    private matDialg: MatDialog,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private userService: UserService,
    private loadingService: LoadingService,
    private formatService: FormatService
  ) { }

  ngOnInit() {

    this.sr = screen.width <= 412? false: true;

    this.listUser = [];
    this.fakedData = [];

    this.loadingService.show();
    
    this.orderService.list().subscribe( data => {

      console.log("orderService LIST: ", data);

      let i = 0;
      
      this.fakedData = data;

      if(data.length == 0) this.loadingService.hide();
      this.fakedData.forEach(element => {
        
        this.userService.getById(element.makh).subscribe( user => {

          element.tenkh = user.data.tenkh,
          element.sdt = user.data.sdt
        })

        this.orderDetailService.getByParams({madh: element.madh}).subscribe( ct => {

          i++;
          element.listProduct = ct;

          if(i == this.fakedData.length) {

            this.loadingService.hide();
          }
        })
      });
    }, error => {

      this.loadingService.hide();
    });
  }

  formatDate(data) {

    return this.formatService.formatDate(data);
  }

  gotoDetail(element) {

    this.matDialg.open(OrderComponent, {
      data: element,
      maxHeight: '80%',
      height: '80%'
    }).afterClosed().subscribe( data => {

      if(data == 2) {

        console.log("index delete: ", this.fakedData.indexOf(element));
        this.fakedData.splice(this.fakedData.indexOf(element), 1);

        this.fakedData = this.fakedData.concat([]);
      } else if(data == 1) {

        this.userService.getById(element.makh).subscribe( user => {

          element.tenkh = user.data.tenkh,
          element.sdt = user.data.sdt
        })

        this.orderDetailService.getByParams({madh: element.madh}).subscribe( ct => {

          element.listProduct = ct;
        })
      }
    })
  }
}
