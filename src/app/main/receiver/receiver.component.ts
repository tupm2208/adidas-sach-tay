import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../core/util/loading.service';
import { FormatService } from '../../core/util/format.service';
import { MainService } from '../../core/api/main.service';
import { PopupService } from '../../core/dialog/popup/popup.service';
import { UserService } from '../../core/api/user.service';
import { FormControl } from '@angular/forms';
import { OrderService } from '../../core/api/order.service';
import { ReceiveService } from '../../core/api/receive.service';
import { ReceiveDetailService } from '../../core/api/receive-detail.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {

  private filterUser = '';
  private sdt = '';
  private tenkh = '';
  private selectedUser: any = null;
  private myControl: any = new FormControl();
  private listOrder: any = [];
  private optionsUser: any = [];
  private receiveData: any = {
    ngay: new Date().getTime(),
    trangthai: 5,
    chitietnhs: [],
    khoiluong: 0,
    dongia: 0,
    phuphi: 0
  };

  constructor(
    private loadingService: LoadingService,
    private formatService: FormatService,
    private mainService: MainService,
    private popupService: PopupService,
    private userService: UserService,
    private orderService: OrderService,
    private receiveService: ReceiveService,
    private receiveDetailService: ReceiveDetailService
  ) { }

  onInitData() {

    this.filterUser = '';
    this.sdt = '';
    this.tenkh = '';
    this.selectedUser = null;
    this.myControl = new FormControl();
    this.listOrder = [];
    this.optionsUser = [];
    this.receiveData = {
      ngay: new Date().getTime(),
      trangthai: 5,
      chitietnhs: [],
      khoiluong: 0,
      dongia: 0,
      phuphi: 0
    };
  }

  ngOnInit() {

    this.loadingService.show();

    this.onInitData();
    this.getListOrder();
    this.getListUser();
    this.subcribeUser();
  }

  getListOrder() {

    this.mainService.listOrder({trangthai: 4}).subscribe( data => {

      this.listOrder = data;
      this.loadingService.hide();
      console.log("list order: ", this.listOrder);
    });
  }

  getListUser() {

    this.userService.search({maloainv: 6}).subscribe( users => {

      this.optionsUser = users;
      console.log("user ml6: ", users);
    })
  }

  subcribeUser() {

    this.myControl.valueChanges.subscribe( data => {

      this.filterUser = data;

      for(let i = 0; i < this.optionsUser.length; i++) {

        if(this.optionsUser[i].tenkh == data) {

          this.selectedUser = this.optionsUser[i];

          return;
        }
      }

      this.selectedUser = null;
    })
  }

  selectItem(item) {

    item.manh = !item.manh;

    if(item.manh) {

      this.receiveData.chitietnhs.push({
        madh: item.madh,
        soluong: item.tongsl,
        giuhop: item.giuhop
      });
    } else {

      this.receiveData.chitietnhs.splice(this.receiveData.chitietnhs.indexOf(item), 1);
    }
  }

  refreshPage() {

    this.popupService.showSuccess().subscribe( () => {

      console.log("refresh ok!");
      this.ngOnInit();
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

  submit() {

    if(!this.checkBeforeSubmit()) {

      this.popupService.showError();
      return;
    }

    this.loadingService.show();

    this.receiveData.makh = this.selectedUser.makh;

    this.receiveService.create(this.receiveData).subscribe( res => {

      console.log("data receiver create success: ", res);
      this.receiveData.manh = res.data.manh;

      this.updateOrder();
    })
  }

  checkBeforeSubmit() {

    if(!this.receiveData.chitietnhs.length) return false;

    if(!this.selectedUser) return false;

    return true;
  }

  updateOrder() {

    let count = 0;
    this.listOrder.forEach(element => {
      
      if(element.manh) {

        element.manh = this.receiveData.manh;
        element.trangthai = 5;
        this.orderService.update(element).subscribe( data => {

          this.receiveDetailService.create({
            madh: element.madh,
            soluong: element.tongsl,
            giuhop: element.giuhop,
            manh: element.manh
          }).subscribe( rec => {

            console.log("regist receive success: ", element.madh);
            count++;

            if(count == this.listOrder.length) {

              this.loadingService.hide();
              this.refreshPage();
            }
          })
        }, error => {

          count++;
          element.manh = null;
          console.log("failed update order!");

          if (count == this.listOrder.length) {

            this.loadingService.hide();
            this.popupService.showWanning("there is something wrong! please check and try again!");
          }
        })
      } else {

        count++;
      }
    });
  }
}
