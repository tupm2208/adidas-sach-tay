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
import { BillService } from '../../core/api/bill.service';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {

  private filterUser = '';
  private phone = '';
  private name = '';
  private selectedUser: any = null;
  private myControl: any = new FormControl();
  private listOrder: any = [];
  private optionsUser: any = [];
  private receiveData: any = {
    createdDate: new Date(),
    status: 5,
    receiverdetail: [],
    weight: 0,
    unitPrice: 0,
    surcharge: 0
  };

  constructor(
    private loadingService: LoadingService,
    private formatService: FormatService,
    private mainService: MainService,
    private popupService: PopupService,
    private userService: UserService,
    private orderService: OrderService,
    private receiveService: ReceiveService,
    private receiveDetailService: ReceiveDetailService,
    private billService: BillService
  ) { }

  onInitData() {

    this.filterUser = '';
    this.phone = '';
    this.name = '';
    this.selectedUser = null;
    this.myControl = new FormControl();
    this.listOrder = [];
    this.optionsUser = [];
    this.receiveData = {
      createdDate: new Date(),
      status: 5,
      receiverdetail: [],
      weight: 0,
      unitPrice: 0,
      surcharge: 0
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

    this.orderService.getByParams({status: 4, include: true}).subscribe( data => {

      this.listOrder = data.data;
      this.loadingService.hide();
      this.listOrder.forEach(item => {
        this.getSumOfQuantity(item)
        this.getSumOfQuantity(item, 'keepBox')
      })
      console.log("list order: ", this.listOrder);
    });
  }

  getListUser() {

    this.userService.search({role: 'receiver'}).subscribe( users => {

      this.optionsUser = users.data;
      console.log("user ml6: ", users);
    })
  }

  subcribeUser() {

    this.myControl.valueChanges.subscribe( data => {

      this.filterUser = data;

      for(let i = 0; i < this.optionsUser.length; i++) {

        if(this.optionsUser[i].name == data) {

          this.selectedUser = this.optionsUser[i];

          return;
        }
      }

      this.selectedUser = null;
    })
  }

  selectItem(item) {

    item.receiverId = !item.receiverId;

    if(item.receiverId) {

      this.receiveData.receiverdetail.push({
        reservationId: item.id,
        quantity: item.quantity,
        keepBox: item.keepBox
      });
    } else {

      this.receiveData.receiverdetail.splice(this.receiveData.receiverdetail.indexOf(item), 1);
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

  submit() {

    if(!this.checkBeforeSubmit()) {

      this.popupService.showError("Xin nhập lại!");
      return;
    }

    this.loadingService.show();

    this.receiveData.userId = this.selectedUser.id;

    this.receiveService.create(this.receiveData).subscribe( res => {

      console.log("data receiver create success: ", res);
      this.receiveData.id = res.id;

      this.updateOrder();
    })
  }

  checkBeforeSubmit() {

    if(!this.receiveData.receiverdetail.length) return false;

    if(!this.selectedUser) return false;

    return true;
  }

  updateOrder() {

    let count = 0;
    this.listOrder.forEach(element => {
      
      if(element.receiverId) {

        element.receiverId = this.receiveData.id;
        element.status = 5;
        this.orderService.update(element).subscribe( data => {

          this.billService.update_status({status: element.status}, element.id).subscribe(bills => {
            console.log('updated', element.id)
          })

          this.receiveDetailService.create({
            reservationId: element.id,
            quantity: element.quantity,
            keepBox: element.keepBox,
            receiverId: element.receiverId
          }).subscribe( rec => {

            console.log("regist receive success: ", element.reservationId);
            count++;

            if(count == this.listOrder.length) {

              this.loadingService.hide();
              this.refreshPage();
            }
          })
        }, error => {

          count++;
          element.receiverId = null;
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

  getSumOfQuantity(item, value='quantity') {
    let sum = 0
    item.reservationdetail.forEach(element => {
      sum += element[value]
    })
    item[value] = sum
  }
}
