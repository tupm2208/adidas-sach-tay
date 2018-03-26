import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BillService } from '../../../api/bill.service';
import { BillDetailService } from '../../../api/bill-detail.service';
import { PopupService } from '../../popup/popup.service';
import { LoadingService } from '../../../util/loading.service';
import { StorageService } from '../../../util/storage.service';

declare let $: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  private billDetailList: any = [{
    masp: '',
    soluong: 1,
    trangweb: '',
    giaweb: 0,
    trietkhau: 0.85,
    khoiluong: 0,
    giuhop: 0,
    mahd: null,
    makh: null,
  }];

  private tigia: number;

  private isError = false;
  private isNew = false;

  constructor(
    private dialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billService: BillService,
    private billDetailService: BillDetailService,
    private popupDialog: PopupService,
    private loading: LoadingService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    console.log("data: ", this.data);

    this.tigia = this.storageService.get('tigia');

    this.billDetailList[0].makh = this.data.user.makh;

    if(this.data.bill && this.data.bill.mahd && this.data.bill.chitiethds) {

      this.billDetailList = this.data.bill.chitiethds;

    }

    if(!this.data.bill) {

      this.data.bill = {
        ngay: this.getTime(),
        makh: this.data.user.makh,
        trangthai: 2,
        datcoc: 0,
        ship: 0,
        thuonghieu: 'adidas',
        tigia: Number(this.tigia) + Number(this.data.user.tigia),
        thanhtien: 0,
        phuphi: 0
      }
    }
  }

  ngAfterViewInit() {

    $('app-upload').parent().parent().attr('id','upload');
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

    if(data.mahd) {

      this.loading.show('upload');

      this.billDetailService.delete(data).subscribe(del => {

        this.billDetailList.splice(this.billDetailList.indexOf(data),1);

        this.loading.hide('upload');

        if (this.billDetailList.length == 0) {
          
          if (this.data.bill.mahd) {
            this.loading.show('upload');
            this.dialogRef.close(-2);
            this.billService.delete(this.data.bill).subscribe(data => {

              console.log("delete bill: ", this.data.bill);
              this.loading.hide('upload');
            }, error => {

              this.loading.hide('upload');
            });
          }
        }
      }, error => {

        this.popupDialog.showError();
        this.loading.hide('upload');
      })
    } else {

      this.billDetailList.splice(this.billDetailList.indexOf(data), 1);

      if (this.billDetailList.length == 0) {

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

    this.billDetailList.forEach( element => {

      element.giuhop = element.giuhop? element.soluong: 0;
      if(element.mahd) {

        this.billDetailService.update(element).subscribe( data => {

          countSuc += 1;

          if(countSuc == this.billDetailList.length) {

            this.showSuccess();
          } else if(countSuc + countErr == this.billDetailList.length) {

            this.showError();
          }
        }, error => {

          countErr += 1;

          if(countSuc + countErr == this.billDetailList.length) {

            this.showError();
          }       
        })
      } else {

        element.mahd = this.data.bill.mahd;
        this.billDetailService.create(element).subscribe( data => {

          countSuc += 1;

          if(countSuc == this.billDetailList.length) {

            this.showSuccess();
          } else if(countSuc + countErr == this.billDetailList.length) {

            this.showError();
          }
        }, error => {

          element.mahd = null;
          countErr += 1;

          if(countSuc + countErr == this.billDetailList.length) {

            this.showError();
          }      
        })
      }
    })
  }

  regist() {

    if(!this.checkValid()) return;

    this.loading.show('upload');
    if(this.data.bill && this.data.bill.mahd) {

      this.billService.update(this.data.bill).subscribe( data => {

        console.log("put data bill: ", data);
        this.registOrUpdate();
      }, error => {

        this.loading.hide('upload');
        this.popupDialog.showError();
      })
    } else {

      this.billService.create(this.data.bill).subscribe( data => {

        this.isNew = true;
        console.log("create data bill: ", data);
        this.data.bill.mahd = data.data.mahd;
        this.data.bill.chitiethds = this.billDetailList;
        this.registOrUpdate();
      }, error => {

        this.popupDialog.showError();
        this.loading.hide('upload');
      })
    }
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

      if(this.isNew) {

          this.dialogRef.close(this.data.bill);
      }else {

          this.dialogRef.close(-1);
      }
    })
  }

  calculate() {

    let sum = 0;
    this.billDetailList.forEach( element => {

      sum += element.giaweb * this.data.bill.tigia  *  element.trietkhau * element.soluong;
    });

    this.data.bill.thanhtien =  sum - -this.data.bill.ship - -this.data.bill.phuphi;
  }
}
