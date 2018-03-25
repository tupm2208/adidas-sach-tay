import { Component, OnInit, Inject } from '@angular/core';

import { LoadingService } from '../../../util/loading.service';
import { FormatService } from '../../../util/format.service';
import { MainService } from '../../../api/main.service';
import { PopupService } from '../../../dialog/popup/popup.service';
import { UserService } from '../../../api/user.service';
import { OrderService } from '../../../api/order.service';
import { ReceiveService } from '../../../api/receive.service';
import { ReceiveDetailService } from '../../../api/receive-detail.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
declare let $: any;

@Component({
  selector: 'app-receive-detail',
  templateUrl: './receive-detail.component.html',
  styleUrls: ['./receive-detail.component.css']
})
export class ReceiveDetailComponent implements OnInit {

  private listOrder: any = [];
  private receiveData: any = {};

  constructor(
    private loadingService: LoadingService,
    private formatService: FormatService,
    private mainService: MainService,
    private popupService: PopupService,
    private orderService: OrderService,
    private receiveService: ReceiveService,
    private receiveDetailService: ReceiveDetailService,
    private dialogRef : MatDialogRef<ReceiveDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public manh: any,
  ) { }

  ngOnInit() {

    $('app-receive-detail').parent().parent().attr('id','app-receive-detail');

    setTimeout(() => {this.loadingService.show('app-receive-detail');},0);

    console.log("manh: ", this.manh);

    this.getListOrder();
    this.getReceive();
  }

  getReceive() {

    this.mainService.listReceive({manh: this.manh}).subscribe( data => {

      this.receiveData = data[0];
    }, error => {

    })
  }

  getListOrder() {

    this.mainService.listOrder({manh: this.manh}).subscribe( data => {

      this.listOrder = data;
      this.loadingService.hide('app-receive-detail');
      console.log("list order: ", this.listOrder);
    });
  }

  selectItem(item) {

    if(this.receiveData.trangthai > 5) {

      this.popupService.showWanning("Không Thể Thêm Bớt Khi Đơn Hàng Không Ở Trạng Thái 'Chưa Về Kho Nhật'");
      return;
    }

    item.manh = item.manh? null: this.receiveData.manh;

  }

  refreshPage() {

    this.popupService.showSuccess().subscribe( () => {

      
    })
  }

  selectAll() {

    let flag = true;

    this.listOrder.forEach( element => {

      if(!element.manh) {

        flag = false;
        return;
      }
    })

    this.listOrder.forEach( element => {

      if(flag) {

        this.selectItem(element);
      } else {

        if(!element.manh) {
          
          this.selectItem(element);
        }
      }
    })
  }

  deleteArray() {

    let count = 0;

    this.listOrder.forEach(element => {
      
      if(!element.manh) {

        element.trangthai = 4;
        this.orderService.update(element).subscribe( order => {

          this.receiveDetailService.delete({manh: this.receiveData.manh, madh: element.madh}).subscribe( resD => {

            console.log("resD: ", resD);

            count++;

            if(count == this.listOrder.length) {

              this.checkToDeleteReceive();
            }
          })
        }, error => {

          element.trangthai = 5;
          element.manh = this.receiveData.manh;
        })
      } else {

        this.finish();
      }
    }); 
  }

  finish() {

    this.loadingService.hide('app-receive-detail');
    this.popupService.showSuccess().subscribe( data => {

      this.dialogRef.close();
    })
  }

  checkToDeleteReceive() {

    let flag = true;

    this.listOrder.forEach(element => {
      
      if(element.manh) {

        flag = false;
        return;
      }
    });

    if(flag) {

      this.receiveService.delete(this.receiveData).subscribe( data => {

        console.log("delete ok!", this.receiveData.madh);
        this.finish();
      }, error => {

        console.log("erro: ", error);
        this.finish();
      })
    } else {

      this.finish();
    }
  }

  submit() {

    if(!this.checkBeforeSubmit()) {

      this.popupService.showError();
      return;
    }

    this.loadingService.show('app-receive-detail');

    if(this.receiveData.trangthai == 8) {

      if(!this.receiveData.ngaynhan) this.receiveData.ngaynhan = new Date().getTime();
    } else {

      this.receiveData.ngaynhan = 0;
    }
    this.receiveService.update(this.receiveData).subscribe( res => {

      this.deleteArray();
    }, error => {

      this.loadingService.hide('app-receive-detail');
      this.popupService.showError();
    })
  }

  checkBeforeSubmit() {

    if(!this.receiveData.chitietnhs.length) return false;

    return true;
  }

}
