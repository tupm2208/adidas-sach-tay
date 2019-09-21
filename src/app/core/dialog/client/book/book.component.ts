import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WaitingBillService } from '../../../api/waiting-bill.service';
import { WaitingBillDetailService } from '../../../api/waiting-bill-detail.service';
import { PopupService } from '../../popup/popup.service';
import { LoadingService } from '../../../util/loading.service';

declare let $: any;

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  private billDetailList: any = [{
    productId: '',
    quantity: 1,
    brand: '',
    price: '',
    keepBox: 0,
  }];

  private isNew: Boolean = true;

  private isError = false;

  constructor(
    private dialogRef: MatDialogRef<BookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private waitingBillService: WaitingBillService,
    private waitingBillDetailService: WaitingBillDetailService,
    private popupDialog: PopupService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    console.log("data: ", this.data);

    if(this.data.bill && this.data.bill.id && this.data.bill.billdetail) {

      this.billDetailList = this.data.bill.billdetail;
    }

    if(this.data.bill && this.data.bill.id && this.data.bill.choduyetcthds) {

      this.billDetailList = this.data.bill.choduyetcthds;
    }

    if(!this.data.bill) {

      this.isNew = true;

      this.data.bill = {
        createdDate: this.getTime(),
        userId: this.data.user.userId,
        status: 2,
        deposit: '',
        shipFee: '',
        brand: 'adidas'
      }
    }
  }

  ngAfterViewInit() {

    $('app-book').parent().parent().attr('id','upload');
  }

  onClick() {

    this.dialogRef.close();
  }

  getTime() {

    let a = new Date;

    return a.getTime();
  }

  addProduct(data) {
    data.billId = null;
    this.billDetailList.push(data);
  }

  deleteProduct(data) {

    this.billDetailList.splice(this.billDetailList.indexOf(data), 1);

    if (this.billDetailList.length == 0) {

      if (this.data.bill.id) {

        this.loading.show('upload');
        this.waitingBillService.delete(this.data.bill).subscribe(data => {

          console.log("delete bill: ", this.data.bill);
          this.loading.hide('upload');
          this.dialogRef.close();
        }, error => {

          this.loading.hide('upload');
        });
      } else {

        this.dialogRef.close();
      }
    }
  }

  checkValid() {

    for(let i = 0; i< this.billDetailList.length; i++) {

      if(!this.billDetailList[i].productId || !this.billDetailList[i].quantity) {

        return false;
      }
    }

    return true;
  }

  registOrUpdate() {

    let countErr = 0;
    let countSuc = 0;

    this.billDetailList.forEach(element => {

      element.billId = this.data.bill.id;
      this.waitingBillDetailService.create(element).subscribe(data => {

        countSuc += 1;

        if (countSuc == this.billDetailList.length) {

          this.showSuccess();
        } else if (countSuc + countErr == this.billDetailList.length) {

          this.showError();
        }
      }, error => {

        element.billId = null;
        countErr += 1;

        if (countSuc + countErr == this.billDetailList.length) {

          this.showError();
        }
      })
    })
  }

  createBill() {

    this.waitingBillService.create(this.data.bill).subscribe(data => {

      this.data.bill.id = data.data.id;
      this.registOrUpdate();
    }, error => {

      this.popupDialog.showError(error.message);
      this.loading.hide('upload');
    })
  }

  regist() {

    if (!this.checkValid()) return;

    this.loading.show('upload');

    this.waitingBillService.delete(this.data.bill).subscribe(data => {

      console.log("delete ok: ", data);
      this.createBill();
    }, error => {

      this.loading.hide('upload');
      this.popupDialog.showError(error.message);
    })
  }

  showError() {

    this.loading.hide('upload');
    this.popupDialog.showError('co loi xay ra');
  }

  showSuccess() {

    this.loading.hide('upload');
    this.popupDialog.showSuccess().subscribe( data => {

      this.data.bill.choduyetcthds = this.billDetailList;
      this.dialogRef.close(1);
    })
  }
}
