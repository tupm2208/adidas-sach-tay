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
    masp: '',
    soluong: 1,
    trangweb: '',
    giaweb: '',
    trietkhau: '',
    khoiluong: '',
    tigia: '',
    giuhop: 0,
    mahd: null,
    makh: null,
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

    this.billDetailList[0].makh = this.data.user.makh;
    this.billDetailList[0].maduyetkh = this.data.user.maduyetkh;


    if(this.data.bill && this.data.bill.mahd && this.data.bill.chitiethds) {

      this.billDetailList = this.data.bill.chitiethds;
    }

    if(this.data.bill && this.data.bill.mahd && this.data.bill.choduyetcthds) {

      this.billDetailList = this.data.bill.choduyetcthds;
    }

    if(!this.data.bill) {

      this.isNew = true;

      this.data.bill = {
        ngay: this.getTime(),
        makh: this.data.user.makh,
        maduyetkh : this.data.user.maduyetkh,
        trangthai: 2,
        datcoc: '',
        ship: '',
        thuonghieu: 'adidas'
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
    data.mahd = null;
    this.billDetailList.push(data);
  }

  deleteProduct(data) {

    this.billDetailList.splice(this.billDetailList.indexOf(data), 1);

    if (this.billDetailList.length == 0) {

      if (this.data.bill.mahd) {

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

      if(!this.billDetailList[i].masp || !this.billDetailList[i].soluong) {

        return false;
      }
    }

    return true;
  }

  registOrUpdate() {

    let countErr = 0;
    let countSuc = 0;

    this.billDetailList.forEach(element => {

      element.mahd = this.data.bill.mahd;
      this.waitingBillDetailService.create(element).subscribe(data => {

        countSuc += 1;

        if (countSuc == this.billDetailList.length) {

          this.showSuccess();
        } else if (countSuc + countErr == this.billDetailList.length) {

          this.showError();
        }
      }, error => {

        element.mahd = null;
        countErr += 1;

        if (countSuc + countErr == this.billDetailList.length) {

          this.showError();
        }
      })
    })
  }

  createBill() {

    this.waitingBillService.create(this.data.bill).subscribe(data => {

      console.log("create data bill: ", data);
      this.data.bill.mahd = data.data.mahd;
      this.data.bill.chitiethds = this.billDetailList;
      this.registOrUpdate();
    }, error => {

      this.popupDialog.showError();
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
      this.popupDialog.showError();
    })
  }

  showError() {

    this.loading.hide('upload');
    this.popupDialog.showError().subscribe( data => {

      console.log("close error!");
    })
  }

  showSuccess() {

    this.loading.hide('upload');
    this.popupDialog.showSuccess().subscribe( data => {

      this.data.bill.choduyetcthds = this.billDetailList;
      this.dialogRef.close(this.isNew? this.data.bill: null);
    })
  }

  calculate() {

    let sum = 0;
    this.billDetailList.forEach( element => {

      sum += element.giaweb * element.tigia * (1 + element.trietkhau) * element.soluong;
    });

    return sum;
  }
}
