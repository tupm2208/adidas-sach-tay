import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

//service
import { UserService } from '../../../core/api/user.service';
import { LoadingService } from '../../../core/util/loading.service';
import { DialogService } from '../../../core/dialog/dialog.service';
import { FormatService } from '../../../core/util/format.service';
import { UserDialogService } from '../../../core/dialog/user/user-dialog.service';
import { OrderService } from '../../../core/api/order.service'
import { BillService } from '../../../core/api/bill.service';

declare var $:any;

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  private reservationId = '';
  private orderData: any = [];
  private user: any = {};
  private from: any;
  private to: any;
  private sr = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private formatService: FormatService,
    private userDialog: UserDialogService,
    private orderService: OrderService,
    private billService: BillService
  ) { }

  ngOnInit() {

    this.loadingService.show();

    let id = this.route.snapshot.paramMap.get('id');

    this.userService.getById(id).subscribe( userData => this.user = userData.data, error => {});

    this.orderService.getByParams({userId: id, include: true}).subscribe( order => {

      order.data.forEach(item => {
        this.calculateQuantity(item)
      })
      this.orderData = order.data;

      console.log("order data: ", order);
      this.loadingService.hide();
      
    }, error => {

      this.loadingService.hide();
    })
  }

  updateUser() {

    this.userDialog.openUserDetail(this.user);
  }

  openOrder(item) {
    const before = item.status
    this.dialogService.gotoOrder(item.id).subscribe( data => {

      console.log("data close: ", data);

      if(data) {

        this.orderService.getByParams({id: item.id, include: true}).subscribe( order => {

          // item = order.data;
          console.log("data success: ", order);

          if(order.data.length) {

            this.orderData.splice(this.orderData.indexOf(item), 1,order.data[0]);

            this.orderData = this.orderData.concat([]);
            const data = order.data[0]
            if(before != data.status) {
              this.billService.update_status({status: data.status}, data.id).subscribe(bills => {
                console.log('updated', item.id)
              })
            }
            this.calculateQuantity(data)
          } else {
            
            this.orderData.splice(this.orderData.indexOf(item), 1);

            this.orderData = this.orderData.concat([]);
          }
        }, error => {

          console.log("data error: ", error);
        })
      }
    })
  }

  calculateByProp(name, name2?) {

    let sum = 0;

    this.orderData.forEach(element => {
      
      element[name2] = element[name2]?element[name2]:1;

      sum += Number(element[name]) * Number(element[name2]);
    });

    return sum;
  }

  calculateQuantity(item) {
    item.quantity = 0
    item.keepBox = 0
    item.reservationdetail.forEach(element => {
      item.quantity += element.quantity
      item.keepBox += element.keepBox
    })
  }
}
