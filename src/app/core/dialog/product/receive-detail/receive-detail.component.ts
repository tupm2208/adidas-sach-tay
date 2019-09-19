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
    @Inject(MAT_DIALOG_DATA) public receiverId: any,
  ) { }

  ngOnInit() {

    $('app-receive-detail').parent().parent().attr('id','app-receive-detail');

    setTimeout(() => {this.loadingService.show('app-receive-detail');},0);

    console.log("receiverId: ", this.receiverId);

    this.getListOrder();
    this.getReceive();
  }

  getReceive() {

    this.receiveService.search({id: this.receiverId, include: true}).subscribe( data => {

      this.receiveData = data.data[0];
    }, error => {

    })
  }

  getListOrder() {

    this.orderService.getByParams({receiverId: this.receiverId, include: true}).subscribe( data => {

      this.listOrder = data.data;
      this.loadingService.hide('app-receive-detail');
      console.log("list order: ", this.listOrder);
    });
  }

  selectItem(item) {

    if(this.receiveData.status > 5) {

      this.popupService.showWanning("Không Thể Thêm Bớt Khi Đơn Hàng Không Ở Trạng Thái 'Chưa Về Kho Nhật'");
      return;
    }

    item.receiverId = item.receiverId? null: this.receiveData.id;

  }

  refreshPage() {

    this.popupService.showSuccess().subscribe( () => {

      
    })
  }

  selectAll() {

    let flag = true;

    this.listOrder.forEach( element => {

      if(!element.receiverId) {

        flag = false;
        return;
      }
    })

    this.listOrder.forEach( element => {

      if(flag) {

        this.selectItem(element);
      } else {

        if(!element.receiverId) {
          
          this.selectItem(element);
        }
      }
    })
  }

  deleteArray() {

    let count = 0;

    this.listOrder.forEach(element => {
      
      if(!element.receiverId) {

        element.status = 4;
        this.orderService.update(element).subscribe( order => {

          this.receiveDetailService.delete({receiverId: this.receiveData.id, reservationId: element.id}).subscribe( resD => {

            console.log("resD: ", resD);

            count++;

            if(count == this.listOrder.length) {

              this.checkToDeleteReceive();
            }
          })
        }, error => {

          element.status = 5;
          element.receiverId = this.receiveData.id;
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
      
      if(element.receiverId) {

        flag = false;
        return;
      }
    });

    if(flag) {

      this.receiveService.delete(this.receiveData).subscribe( data => {

        console.log("delete ok!", this.receiveData.id);
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

      this.popupService.showError('co loi xay ra');
      return;
    }

    this.loadingService.show('app-receive-detail');

    if(this.receiveData.status == 8) {

      if(!this.receiveData.arrivedDate) this.receiveData.arrivedDate = new Date();
    } else {

      this.receiveData.arrivedDate = 0;
    }
    this.receiveService.update(this.receiveData).subscribe( res => {

      this.deleteArray();
    }, error => {

      this.loadingService.hide('app-receive-detail');
      this.popupService.showError(error.message);
    })
  }

  checkBeforeSubmit() {

    if(!this.receiveData.receiverdetail.length) return false;

    return true;
  }

}
