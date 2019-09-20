import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

//service
import { BillService } from '../../../api/bill.service';
import { OrderService } from '../../../api/order.service';
import { OrderDetailService } from '../../../api/order-detail.service'; 
import { LoadingService } from '../../../util/loading.service';
import { PopupService } from '../../../dialog/popup/popup.service';
import { FormatService } from '../../../util/format.service';
import { MainService } from '../../../api/main.service';

declare let $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  listBills = [];
  result = [];
  orderData: any = {};

  counter = 0;

  constructor(
    private billService: BillService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private loadingService: LoadingService,
    private popupService: PopupService,
    private formatService: FormatService,
    private mainService: MainService
  ) { }

  ngOnInit() {

    console.log("init order data: ", this.id);
    $('app-order').parent().parent().attr('id','app-order');

    setTimeout( () => this.loadingService.show('app-order'), 0);

    this.getBills();

    this.getOrder();
  }

  getBills() {

    this.billService.search({reservationId: this.id, include: true}).subscribe( data => {

      this.listBills = data.data;
      this.loadingService.hide('app-order');
      console.log("bill list data: ", data);
    })
  }

  getOrder() {

    this.orderService.getByParams({id: this.id, include: true}).subscribe( data => {

      this.orderData = data.data[0];
      delete this.orderData.receiverId;
      delete this.orderData.finishedDate;

      console.log("listorder data: ", this.orderData);
      setTimeout(() => {
        this.loadingService.hide('app-order');
      }, 50)
      // delete this.orderData.quantity;
      // delete this.orderData.keepBox;
    })
  }

  selectItem(item) {

    if(this.orderData.status != 3) {
      this.popupService.showWanning("Hóa Đơn Này Đã Được Thanh Toán Nên Không Thể Gỡ Bỏ Đơn Đặt Hàng");
      return;
    }
    console.log("selectItem")

    item.reservationId = item.reservationId? null: this.id;
    item.billdetail.forEach(elem => {

      let flag = true;
      this.orderData.reservationdetail.forEach(element => {

        if (element.productId == elem.productId) {

          flag = false;
          if(item.reservationId) {

            item.status = 3;

            element.quantity += elem.quantity;
            if (elem.keepBox) {
              element.keepBox += elem.quantity;
            }
          } else {

            item.status = 2;
            if(element.quantity == elem.quantity) {

              this.orderData.reservationdetail.splice(this.orderData.reservationdetail.indexOf(element), 1);
            } else {

              element.quantity -= elem.quantity;
              if (elem.keepBox) {
                element.keepBox -= elem.quantity;
              }
            }
          }
          return;
        }
      })

      if(flag) {

        this.orderData.reservationdetail.push({
          productId: elem.productId,
          quantity: elem.quantity,
          keepBox: elem.keepBox? elem.quantity: 0,
          reservationId: this.orderData.reservationId,
          userId: this.orderData.userId
        })
      }
    })
  }

  checkAndCountNum(billDetail) {

    let flag = true;

    this.orderData.reservationdetail.forEach(element => {

      if(element.productId == billDetail.productId) {

        flag = false;
        element.flag = true;
      }
    })

    if(flag) {

      this.orderData.reservationdetail.push({
        productId: billDetail.productId,
        quantity: 0,
        keepBox: 0
      })

      this.checkAndCountNum(billDetail);
    }
  }

  selectAll() {

    if(this.orderData.status != 3) {
      this.popupService.showWanning("Hóa Đơn Này Đã Được Thanh Toán Nên Không Thể Gỡ Bỏ Khỏi Đơn Hàng!");
      return;
    }

    let flag = true;

    this.listBills.forEach( element => {

      if(!element.reservationId) {

        flag = false;
        return;
      }
    })

    this.listBills.forEach( element => {

      if(flag) {

        this.selectItem(element);
      } else {

        if(!element.reservationId) {
          
          this.selectItem(element);
        }
      }
    })
  }

  returnArray(): Array<any> {

    return this.listBills.filter( element => {

      return element.reservationId? false: true;
    })
  }

  promisList(): Array<any> {

    let a = [];

    this.returnArray().forEach( element => {

      a.push(this.billService.update(element));
    })

    console.log("a: ", a);
    return a;
  }

  async submit() {

    this.loadingService.show('app-order');
    let flag = true;

    let result = await Observable.forkJoin(...this.promisList()).toPromise().then( data => {

      this.counter ++;
      
      this.returnArray().forEach( element => {

        element.billdetail.forEach(elem => {

          this.checkAndCountNum(elem);
        });
      })
    })
    
    this.checkOrder();
  }

  updateProductList(): Array<any> {

    return this.orderData.reservationdetail.filter( element => {

      return element.flag? true: false;
    }) 
  }

  obserProductList(): Array<any> {

    let a = [];

    this.updateProductList().forEach(element => {
      
      if(element.quantity == 0) {

        a.push(this.orderDetailService.delete({reservationId: this.id, productId: element.productId}))
      } else {

        element.reservationId = this.id;
        a.push(this.orderDetailService.update(element));
      }
    });

    return a;
  }


  async checkOrder() {

    await Observable.forkJoin(...this.obserProductList()).toPromise().then( data => {

      console.log("data: checkORder: ", data);
    }).catch( error => {

      console.log("catch: ", error);
    })

    let flag = true;

    this.orderData.reservationdetail.forEach( element => {

      if(element.quantity) {

        flag = false;
        return;
      }
    })

    if(flag) {

      this.orderService.delete(this.id).subscribe( data => {

        console.log("delete order: ", data);

        this.loadingService.hide('app-order');
        this.popupService.showSuccess().subscribe( data => {

          console.log("success: ", data);
          this.dialogRef.close(2);
        })
      }, error => {

        this.loadingService.hide('app-order');
        this.popupService.showError("Không thể xóa");
      })
    } else {

      this.orderService.update(this.orderData).subscribe( orderData => {

        console.log("update order: ", orderData);

        this.loadingService.hide('app-order');
        this.popupService.showSuccess().subscribe( data => {

          this.dialogRef.close(orderData.status);
        })
      }, error => {

        this.loadingService.hide('app-order');
        this.popupService.showError("Có lỗi xảy ra! Xin thử lại");
      })
    }
  }
}
