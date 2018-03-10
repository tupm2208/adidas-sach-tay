import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { BillService } from '../../core/api/bill.service';
import { BillDetailService } from '../../core/api/bill-detail.service';
import { DialogService } from '../../core/dialog/dialog.service';
import { LoadingService } from '../../core/util/loading.service';

declare let $: any;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  private billDetailList = [{
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

  private isError = false;

  constructor(
    private dialogRef: MatDialogRef<UploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private billService: BillService,
    private billDetailService: BillDetailService,
    private dialogService: DialogService,
    private loading: LoadingService
  ) { }

  ngOnInit() {
    console.log("data: ", this.data);

    this.billDetailList[0].makh = this.data.user.makh;

    if(this.data.bill && this.data.bill.masp) {

      this.billDetailList = this.data.bill.listMasp;
    }

    if(!this.data.bill) {

      this.data.bill = {
        ngay: this.setDay(),
        makh: this.data.user.makh,
        trangthai: 1,
        datcoc: '',
        ship: ''
      }
    }
  }

  ngAfterViewInit() {

    $('app-upload').parent().parent().attr('id','upload');
  }

  onClick() {

    this.dialogRef.close();
  }

  addProduct(data) {
    data.mahd = '';
    this.billDetailList.push(data);
  }

  deleteProduct(data) {

    if(data.mahd) {

      this.billDetailService.delete(data).subscribe(data => {

        console.log("delete bill detail: ", data);

         if(this.billDetailList.length == 0) {

           if (this.data.bill.mahd) {

             this.billService.delete(this.data.bill).subscribe(data => {

               console.log("delete bill: ", this.data.bill);
             });
           }
         }
      })
    }
    this.billDetailList.splice(this.billDetailList.indexOf(data),1);

    if(this.billDetailList.length == 0) {

      this.dialogRef.close();
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

      if(element.mahd) {

        this.billDetailService.update(element).subscribe( data => {

          console.log("update info of detail bill: ", data);

          countSuc += 1;

          if(countSuc == this.billDetailList.length) {

            this.showSuccess();
          } else if(countSuc + countErr == this.billDetailList.length) {

            this.showError();
          }
        }, error => {

          countErr += 1;
          console.log("fail to update info of detail bill: ", error);

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

          countErr += 1;
          console.log("fail to update info of detail bill: ", error);

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
      })
    } else {

      this.billService.create(this.data.bill).subscribe( data => {

        console.log("create data bill: ", data);
        this.data.bill.mahd = data.data.mahd;
        this.registOrUpdate();
      })
    }
  }

  setDay() {

    let day = new Date();

    return day.getMonth() + '/' + day.getDate() + '/' + day.getFullYear();
  }

  showError() {

    this.loading.hide('upload');
    this.dialogService.showError().subscribe( data => {

      console.log("close error!");
    })
  }

  showSuccess() {

    this.loading.hide('upload');
    this.dialogService.showSuccess().subscribe( data => {

      if(!data) {

        this.dialogRef.close();
      }
    })
  }
}
