import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoadingService } from '../../core/util/loading.service';
import { FormatService } from '../../core/util/format.service';
import { DialogService } from '../../core/dialog/dialog.service';
import { MainService } from '../../core/api/main.service';
import { OrderService } from '../../core/api/order.service';
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private reservationId = '';
  private name = '';
  private fakedData = [];
  private from: any;
  private to: any;
  private sr = true;

  constructor(
    private matDialg: MatDialog,
    private loadingService: LoadingService,
    private formatService: FormatService,
    private dialogService: DialogService,
    private mainService: MainService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {

    this.sr = screen.width <= 412? false: true;

    this.fakedData = [];

    this.loadingService.show();

    this.orderService.getByParams({include: true}).subscribe( data => {

      console.log("main service data: ", data);
      this.fakedData = data.data;
      this.fakedData.forEach(item => {
        this.getSumOfQuantity(item)
      })
      this.loadingService.hide();
    })
  }

  formatDate(data) {

    return this.formatService.formatDate(data);
  }

  gotoDetail(element) {

    this.dialogService.gotoOrder(element.id).subscribe( data => {

      if(data == 2) {

        this.fakedData.splice(this.fakedData.indexOf(element), 1);

        this.fakedData = this.fakedData.concat([]);
      } else if(data == 1) {

        this.orderService.getByParams({userId: element.userId, id: element.id, include: true}).subscribe( listItem => {

          this.getSumOfQuantity(listItem.data[0]) // update quantity
          this.fakedData.splice(this.fakedData.indexOf(element), 1, listItem.data[0]);
          this.fakedData = this.fakedData.concat([]);
        })
      }
    })
  }

  calculateByProp(name, name2?) {

    let sum = 0;

    this.fakedData.forEach(element => {
      
      element[name2] = element[name2]?element[name2]:1;

      sum += Number(element[name]) * Number(element[name2]);
    });

    return sum;
  }

  getSumOfQuantity(item) {
    let sum = 0
    item.reservationdetail.forEach(element => {
      sum += element.quantity
    })
    item.quantity = sum
  }
}
