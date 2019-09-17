import { Component, OnInit } from '@angular/core';
import { MainService } from '../../core/api/main.service';
import { LoadingService } from '../../core/util/loading.service'
import { FormatService } from '../../core/util/format.service';
import { DialogService } from '../../core/dialog/dialog.service';
import { ReceiveService } from '../../core/api/receive.service';
import { ReceiveDetailService } from '../../core/api/receive-detail.service';
import { OrderService } from '../../core/api/order.service';

@Component({
  selector: 'app-receive-list',
  templateUrl: './receive-list.component.html',
  styleUrls: ['./receive-list.component.css']
})
export class ReceiveListComponent implements OnInit {

  private receiveList: any = [];
  private sc: any = screen.width <= 414? false: true;
  private name = '';
  private reservationId = '';
  private from = '';
  private to = '';
  private status:any = '';

  constructor(
    private mainService: MainService,
    private loadingService: LoadingService,
    private formatService: FormatService,
    private dialogService: DialogService,
    private receiveService: ReceiveService,
    private receiveDetailService: ReceiveDetailService,
    private orderService: OrderService
  ) { }

  ngOnInit() {

    this.loadingService.show();

    this.receiveService.search({include: true}).subscribe( data => {

      this.receiveList = data.data;
      this.loadingService.hide();
      console.log("data: ", data);
    }, error => {

      this.loadingService.hide();
    })
  }

  openReceiveDetail(element) {

    this.dialogService.openReceive(element.id).subscribe( data => {

      this.receiveService.search({id: element.id, include: true}).subscribe( data => {
        
        if( data.data[0].receiverdetail.length == 0) {
          this.orderService.update_status({status: 4, receiverId: null}, data.data[0].id).subscribe(data => {
            console.log("ok: ", data)
          })

          this.receiveService.delete(data.data[0]).subscribe(data => {
            console.log("delete ok")
            this.receiveList.splice(this.receiveList.indexOf(element), 1);
            this.receiveList = this.receiveList.concat([]);
          })
        } else {
          this.receiveList.splice(this.receiveList.indexOf(element), 1, data.data[0]);
          this.receiveList = this.receiveList.concat([]);
        }
      })
    })
  }

  calculateByProp(name, name2?) {

    let sum = 0;

    this.receiveList.forEach(element => {
      
      //  = element[name2] ? element[name2]: 1;

      element[name2] ? sum += Number(element[name]) * Number(element[name2]): sum+= Number(element[name]);
    });

    return sum;
  }
}
