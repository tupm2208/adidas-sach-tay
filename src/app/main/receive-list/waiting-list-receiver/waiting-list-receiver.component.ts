import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoadingService } from '../../../core/util/loading.service';
import { FormatService } from '../../../core/util/format.service';
import { DialogService } from '../../../core/dialog/dialog.service';
import { MainService } from '../../../core/api/main.service';
import { WaitingReceiveService } from '../../../core/api/waiting-receive.service';
import { ReceiveService } from '../../../core/api/receive.service';
import { PopupService } from '../../../core/dialog/popup/popup.service';

declare var $: any;

@Component({
  selector: 'app-waiting-list-receiver',
  templateUrl: './waiting-list-receiver.component.html',
  styleUrls: ['./waiting-list-receiver.component.css']
})
export class WaitingListReceiverComponent implements OnInit {

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
    private receiveService: ReceiveService,
    private waitingReceiveService: WaitingReceiveService,
    private popupService: PopupService
  ) { }

  ngOnInit() {

    this.sr = screen.width <= 412? false: true;

    this.fakedData = [];

    this.loadingService.show();

    this.mainService.ListReceiverAndWait({}).subscribe( data => {

      console.log("main service data: ", data);
      this.fakedData = data;
      this.loadingService.hide();
    })
  }

  formatDate(data) {

    return this.formatService.formatDate(data);
  }

  gotoDetail(element) {

    this.dialogService.openReceive(element.manh).subscribe( data => {

      if(data == 2) {

        this.fakedData.splice(this.fakedData.indexOf(element), 1);

        this.fakedData = this.fakedData.concat([]);
      } else if(data == 1) {

        this.mainService.listOrder({makh: element.makh, manh: element.manh}).subscribe( listItem => {

          this.fakedData.splice(this.fakedData.indexOf(element), 1, listItem[0]);
          this.fakedData = this.fakedData.concat([]);
        })
      }
    })
  }

  delete(item) {

    this.loadingService.show();

    this.waitingReceiveService.delete(item.choduyetnhs[0]).subscribe( res => {

      item.choduyetnhs = null;
      this.loadingService.hide();

      this.popupService.showSuccess();

      console.log("item: ", item);
    }, error => {

      this.loadingService.hide();
      this.popupService.showError(error.message);
    })
  }

  accept(item) {

    if(!item.choduyetnhs) return;
    this.loadingService.show();

    let ob: any = {};

    this.formatService.copyObject(item, ob)
    this.formatService.copyObject(item.choduyetnhs[0], ob);

    console.log("my ob: ", ob);
    this.receiveService.update(ob).subscribe( res => {

      this.formatService.copyObject(ob, item);
      this.delete(item);
    }, error => {

      this.loadingService.hide();
      this.popupService.showError(error.message);
    })
  }
}
