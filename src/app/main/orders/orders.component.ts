import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoadingService } from '../../core/util/loading.service';
import { FormatService } from '../../core/util/format.service';
import { DialogService } from '../../core/dialog/dialog.service';
import { MainService } from '../../core/api/main.service';
import { OrderService } from '../../core/api/order.service';
import { BillService } from '../../core/api/bill.service';
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
    private billService: BillService
  ) { }

  ngOnInit() {

    this.sr = screen.width <= 412? false: true;

    this.fakedData = [];

    this.loadingService.show();

    this.orderService.getByParams({include: true}).subscribe( data => {

      console.log("main service data: ", data);
      this.fakedData = data.data;
      this.fakedData.forEach(item => {
        this.formatService.getSumOfProp(item, 'quantity')
        this.formatService.getSumOfProp(item, 'price')
      })
      this.loadingService.hide();
    })
  }

  formatDate(data) {

    return this.formatService.formatDate(data);
  }

  gotoDetail(element) {
    const before = element.status
    this.dialogService.gotoOrder(element.id).subscribe( data => {

      if(data == 2) {

        this.fakedData.splice(this.fakedData.indexOf(element), 1);

        this.fakedData = this.fakedData.concat([]);
      } else if(data != 2 && data) {

        this.orderService.getByParams({userId: element.userId, id: element.id, include: true}).subscribe( listItem => {
          let item = listItem.data[0]
          this.formatService.getSumOfProp(item, 'quantity') // update quantity
          this.formatService.getSumOfProp(item, 'price')
          this.fakedData.splice(this.fakedData.indexOf(element), 1, item);
          this.fakedData = this.fakedData.concat([]);
          if(before != item.status) {
            this.billService.update_status({status: item.status}, item.id).subscribe(bills => {
              console.log('updated', item.id)
            })
          }
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
}
