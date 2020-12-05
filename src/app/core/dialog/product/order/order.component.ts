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
import { StokeService } from '../../../api/stoke.service';

declare let $: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderData: any = {};
  billList: any = []
  orginalStatus = 0
  stokeList: any = []

  constructor(
    private billService: BillService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private loadingService: LoadingService,
    private popupService: PopupService,
    private formatService: FormatService,
    private mainService: MainService,
    private stokeService: StokeService
  ) { }

  ngOnInit() {

    console.log("init order data: ", this.id);
    $('app-order').parent().parent().attr('id','app-order');

    setTimeout( () => this.loadingService.show('app-order'), 0);

    this.getOrder();
    this.getBillList()
    this.getStokeList()
  }

  getOrder() {

    this.orderService.getByParams({id: this.id, include: true}).subscribe( data => {

      this.orderData = data.data[0];
      delete this.orderData.receiverId;
      delete this.orderData.finishedDate;
      this.orginalStatus = this.orderData.status

      console.log("listorder data: ", this.orderData);
      setTimeout(() => {
        this.loadingService.hide('app-order');
      }, 50)
      // delete this.orderData.quantity;
      // delete this.orderData.keepBox;
    })
  }

  getBillList() {
    this.billService.search({reservationId: this.id}).subscribe(data => {
      this.billList = data.data
    }, error => {
      console.log("cannot get bill list!", error)
    })
  }

  getStokeList() {
    this.stokeService.search({reservationId: this.id}).subscribe(data => {
      this.stokeList = data.data
    }, error => {
      console.log("cannot get stoke list")
    })
  }

  getNumber(value: string) {
    value = value.replace(/,/g, '')
    return Number(value)
  }

  submit() {

    this.loadingService.show('app-order');
    
    this.checkOrder();
  }

  obserProductList(): Array<any> {

    let a = [];

    this.orderData.reservationdetail.forEach(element => {
      
      a.push(this.orderDetailService.update(element));
    });

    return a;
  }

  deleteReservation() {

    if(this.orginalStatus >= 4) {
      this.popupService.showError("Đơn hàng đã thanh toán xong, không thể xóa")
      return
    }

    this.loadingService.show('app-order')
    Observable.forkJoin(...[
      this.orderDetailService.delete({reservationId: this.orderData.id}),
      this.billService.update_status({status: 2, reservationId: null}, this.orderData.id)
    ]).toPromise().then((result) => {
      console.log('delete parallel: ', result)
      this.orderService.delete(this.orderData.id).subscribe(data => {
        console.log("delete ok: ", data)
        this.loadingService.hide('app-order')
        this.dialogRef.close(2)
      })
    }, error => {
      console.log("failed to delete: ", error)
      this.loadingService.hide('app-order')
      this.popupService.showError("Không thể xóa đơn đặt hàng")
    })
  }

  checkOrder() {

    Observable.forkJoin(...this.obserProductList()).toPromise().then( data => {

      console.log("data: checkORder: ", data);
    }).catch( error => {

      console.log("catch: ", error);
    })


    this.orderService.update(this.orderData).subscribe( orderData => {

      console.log("update order: ", orderData);

      this.loadingService.hide('app-order');
      this.popupService.showSuccess().subscribe( data => {

        this.dialogRef.close(orderData.status);
      })

      if (this.orginalStatus != orderData.status) {
        this.billService.update_status({status: orderData.status}, orderData.id).subscribe(result => {
          console.log("update status ok: ", result)
  
          this.updateStatusBillForAdmin();
        }, error => {
          console.log("update status failed!", error)
        })
      }
    }, error => {

      this.loadingService.hide('app-order');
      this.popupService.showError("Có lỗi xảy ra! Xin thử lại");
    })
  }

  updateStatusBillForAdmin() {
    const status = this.orderData.status == 5? 6: this.orderData.status

    this.billList.forEach(element => {
      if(element.user.role == 'admin') {
        element.status = status
        console.log("status admin: ", status)
        this.updateForAdmin(element)
        this.billService.update(element).subscribe(data => {
          console.log("update for admin success!", data)
        })
      }
    });
    
  }

  updateForAdmin(adminBill) {
    if(this.orderData.status != this.orginalStatus && (this.orderData.status == 5 || this.orginalStatus == 5)) {
      this.stokeList.forEach(item => {

        adminBill.billdetail.forEach(element => {
          if(item.productId == element.productId) {
            let flag = true // will update
            if (this.orginalStatus == 5) { // từ trạng thái đã về viết nam, lùi lại trạng thái
              item.quantity -= element.quantity
              if(item.quantity <=0 ) {
                flag = false
                this.stokeService.delete(item.id).subscribe(() => {
                  console.log("stoke item deleted!")
                }, error => {
                  console.log("error delete stoke item: ", error)
                })
              }

            } else {
              item.quantity += element.quantity

              if(item.quantity == element.quantity) {
                //create
                flag = false
                item.stokePrice = this.formatService.getStokePrice(item, this.orderData.exchangeRate)
                item.orderEmail = this.orderData.orderEmail
                this.stokeService.create(item).subscribe(data => {
                  console.log("create ok", data)
                }, error => {
                  console.log("created failed: ", error)
                })
              }
            }

            if(flag) {
              this.stokeService.update(item).subscribe(data => {
                console.log("update successful!")
              }, error => {
                console.log("update error")
              })
            }
          }
        });

        if(!this.stokeList.length) {
          item.stokePrice = this.formatService.getStokePrice(item, this.orderData.exchangeRate)
          item.orderEmail = this.orderData.orderEmail
          this.stokeService.create(item).subscribe(data => {
            console.log("create ok", data)
          }, error => {
            console.log("created failed: ", error)
          })
        }
      });
      
      // if(!this.stokeList.length) {
      //   item.stokePrice = this.formatService.getStokePrice(item, this.orderData.exchangeRate)
      //   item.orderEmail = this.orderData.orderEmail
      //   this.stokeService.create(item).subscribe(data => {
      //     console.log("create ok", data)
      //   }, error => {
      //     console.log("created failed: ", error)
      //   })
      // }
    }
  }
}
