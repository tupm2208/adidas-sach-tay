import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoadingService } from '../../../core/util/loading.service';
import { FormatService } from '../../../core/util/format.service';
import { DialogService } from '../../../core/dialog/dialog.service';
import { MainService } from '../../../core/api/main.service';
import { WaitingOrderService } from '../../../core/api/waiting-order.service';
import { OrderService } from '../../../core/api/order.service';
import { PopupService } from '../../../core/dialog/popup/popup.service';

declare var $: any;

@Component({
  selector: 'app-waiting-list-order',
  templateUrl: './waiting-list-order.component.html',
  styleUrls: ['./waiting-list-order.component.css']
})
export class WaitingListOrderComponent implements OnInit {

  private madh = '';
  private tenkh = '';
  private fakedData = [];
  private from: any;
  private to: any;
  private sr = true;

  constructor(
    private matDialg: MatDialog,
    private loadingService: LoadingService,
    private formatService: FormatService,
    private dialogService: DialogService,
    private mainService: MainService,
    private orderService: OrderService,
    private waitingOrderService: WaitingOrderService,
    private popupService: PopupService
  ) { }

  ngOnInit() {

    this.sr = screen.width <= 412? false: true;

    this.fakedData = [];

    this.loadingService.show();

    this.mainService.ListOrderAndWait({}).subscribe( data => {

      console.log("main service data: ", data);
      this.fakedData = data;
      this.loadingService.hide();
    })
  }

  formatDate(data) {

    return this.formatService.formatDate(data);
  }

  gotoDetail(element) {

    this.dialogService.gotoOrder(element.madh).subscribe( data => {

      if(data == 2) {

        this.fakedData.splice(this.fakedData.indexOf(element), 1);

        this.fakedData = this.fakedData.concat([]);
      } else if(data == 1) {

        this.mainService.listOrder({makh: element.makh, madh: element.madh}).subscribe( listItem => {

          this.fakedData.splice(this.fakedData.indexOf(element), 1, listItem[0]);
          this.fakedData = this.fakedData.concat([]);
        })
      }
    })
  }

  delete(item) {

    this.loadingService.show();

    this.waitingOrderService.delete(item.madh).subscribe( res => {

      item.choduyetdhs = null;
      this.loadingService.hide();

      this.popupService.showSuccess();

      console.log("item: ", item);
    }, error => {

      this.loadingService.hide();
      this.popupService.showError(error.message);
    })
  }

  accept(item) {

    if(!item.choduyetdhs) return;
    this.loadingService.show();

    let ob: any = {};

    this.formatService.copyObject(item, ob)
    this.formatService.copyObject(item.choduyetdhs[0], ob);

    console.log("my ob: ", ob);
    this.orderService.update(ob).subscribe( res => {

      this.formatService.copyObject(ob, item);
      this.delete(item);
    }, error => {

      this.loadingService.hide();
      this.popupService.showError(error.message);
    })
  }
}
