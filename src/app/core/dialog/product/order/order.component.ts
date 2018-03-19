import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

//service
import { BillService } from '../../../api/bill.service';
import { BillDetailService } from '../../../api/bill-detail.service';
import { OrderService } from '../../../api/order.service';
import { OrderDetailService } from '../../../api/order-detail.service'; 
import { UserService } from '../../../api/user.service';
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
    private userService: UserService,
    private billService: BillService,
    private billDetailService: BillDetailService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public madh: any,
    private loadingService: LoadingService,
    private popupService: PopupService,
    private formatService: FormatService,
    private mainService: MainService
  ) { }

  ngOnInit() {

    console.log("init order data: ", this.madh);
    $('app-order').parent().parent().attr('id','app-order');

    setTimeout( () => this.loadingService.show('app-order'), 0);

    this.getBills();

    this.getOrder();
  }

  getBills() {

    this.mainService.listBill({madh: this.madh}).subscribe( data => {

      this.listBills = data;
      this.loadingService.hide('app-order');
      console.log("bill list data: ", data);
    })
  }

  getOrder() {

    this.mainService.listOrder({madh: this.madh}).subscribe( data => {

      this.orderData = data[0];

      delete this.orderData.tongsl;
      delete this.orderData.giuhop;
    })
  }

  selectItem(item) {

    item.madh = item.madh? null: this.madh;
    item.chitiethds.forEach(elem => {

      let flag = true;
      this.orderData.chitietdhs.forEach(element => {

        if (element.masp == elem.masp) {

          flag = false;
          if(item.madh) {

            element.soluong += elem.soluong;
            element.giuhop += elem.giuhop;
          } else {

            if(element.soluong == elem.soluong) {

              this.orderData.chitietdhs.splice(this.orderData.chitietdhs.indexOf(element), 1);
            } else {

              element.soluong -= elem.soluong;
              element.giuhop -= elem.giuhop;
            }
          }
          return;
        }
      })

      if(flag) {

        this.orderData.chitietdhs.push({
          masp: elem.masp,
          soluong: elem.soluong,
          giuhop: elem.giuhop,
          madh: this.orderData.madh,
          makh: this.orderData.makh
        })
      }
    })
  }

  checkAndCountNum(billDetail) {

    let flag = true;

    this.orderData.chitietdhs.forEach(element => {

      if(element.masp == billDetail.masp) {

        flag = false;
        element.flag = true;
      }
    })

    if(flag) {

      this.orderData.chitietdhs.push({
        masp: billDetail.masp,
        soluong: 0,
        giuhop: 0
      })

      this.checkAndCountNum(billDetail);
    }
  }

  selectAll() {

    let flag = true;

    this.listBills.forEach( element => {

      if(!element.madh) {

        flag = false;
        return;
      }
    })

    this.listBills.forEach( element => {

      if(flag) {

        this.selectItem(element);
      } else {

        if(!element.madh) {
          
          this.selectItem(element);
        }
      }
    })
  }

  returnArray(): Array<any> {

    return this.listBills.filter( element => {

      return element.madh? false: true;
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

        element.chitiethds.forEach(elem => {

          this.checkAndCountNum(elem);
        });
      })
    })
    
    this.checkOrder();
  }

  updateProductList(): Array<any> {

    return this.orderData.chitietdhs.filter( element => {

      return element.flag? true: false;
    }) 
  }

  obserProductList(): Array<any> {

    let a = [];

    this.updateProductList().forEach(element => {
      
      if(element.soluong == 0) {

        a.push(this.orderDetailService.delete({madh: this.madh, masp: element.masp}))
      } else {

        element.madh = this.madh;
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

    this.orderData.chitietdhs.forEach( element => {

      if(element.soluong) {

        flag = false;
        return;
      }
    })

    if(flag) {

      this.orderService.delete(this.madh).subscribe( data => {

        console.log("delete order: ", data);

        this.loadingService.hide('app-order');
        this.popupService.showSuccess().subscribe( data => {

          console.log("success: ", data);
          this.dialogRef.close(2);
        })
      }, error => {

        this.loadingService.hide('app-order');
        this.popupService.showError();
      })
    } else {

      this.orderService.update(this.orderData).subscribe( data => {

        console.log("update order: ", data);

        this.loadingService.hide('app-order');
        this.popupService.showSuccess().subscribe( data => {

          this.dialogRef.close(1);
        })
      }, error => {

        this.loadingService.hide('app-order');
        this.popupService.showError();
      })
    }
  }
}
