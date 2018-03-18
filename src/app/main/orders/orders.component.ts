import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { OrderService } from '../../core/api/order.service';
import { OrderDetailService } from '../../core/api/order-detail.service';
import { UserService } from '../../core/api/user.service';
import { LoadingService } from '../../core/util/loading.service';
import { FormatService } from '../../core/util/format.service';
import { DialogService } from '../../core/dialog/dialog.service';
declare var $: any;

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
    private formatService: FormatService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {

    this.sr = screen.width <= 412? false: true;

    this.listUser = [];
    this.fakedData = [];

    this.loadingService.show();
    
    this.orderDetailService.getByParams({}).subscribe( data => {

      let userList: any = {};

      console.log("bill List: ", data);
      
      if(!data.length) this.loadingService.hide();

      this.fakedData = data;

      this.formatService.formatData(this.fakedData,"madh");
      
      let i = 0;
      this.fakedData.forEach(element => {
        
        if(userList[element.makh]) {

          element.user = userList[element.makh];
          i += 1;
        } else {

          userList[element.makh] = {};
          element.user = userList[element.makh];
          this.userService.getById(element.makh).subscribe(user => {
            
            userList[element.makh].tenkh = user.data.tenkh,
            userList[element.makh].sdt = user.data.sdt
            userList[element.makh].makh = user.data.makh;

            i += 1;

            if (i == this.fakedData.length) {

              this.loadingService.hide();
            }
          }, error => {

            i += 1;

            if (i == this.fakedData.length) {

              this.loadingService.hide();
            }
          })
        }
      });
      console.log("faked order data: ", this.fakedData);
    }, error => {

      this.loadingService.hide();
    });
  }

  formatDate(data) {

    return this.formatService.formatDate(data);
  }

  gotoDetail(element) {

    this.dialogService.gotoOrder(element).subscribe( data => {

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
