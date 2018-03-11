import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { OrderService } from '../../core/api/order.service';
import { OrderDetailService } from '../../core/api/order-detail.service';
import { UserService } from '../../core/api/user.service';
import { LoadingService } from '../../core/util/loading.service';
declare var $: any;

import { OrderComponent } from './order/order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private sdt = '';
  private tenkh = '';
  private listUser = [];
  private fakedData = [];

  constructor(
    private matDialg: MatDialog,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private userService: UserService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {

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
    });
  }

  gotoDetail(element) {

    this.matDialg.open(OrderComponent, {
      data: element,
      maxHeight: '80%',
      height: '80%'
    }).afterClosed().subscribe( data => {

      console.log("abc close", data);
    })
  }
}
