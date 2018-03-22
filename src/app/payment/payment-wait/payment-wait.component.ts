import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../core/util/loading.service';
import { FormatService } from '../../core/util/format.service';
import { ClientService } from '../../core/dialog/client/client.service';
import { StorageService } from '../../core/util/storage.service';
import { WaitingOrderService } from '../../core/api/waiting-order.service';
import { PopupService } from '../../core/dialog/popup/popup.service';
declare var $: any;

@Component({
  selector: 'app-payment-wait',
  templateUrl: './payment-wait.component.html',
  styleUrls: ['./payment-wait.component.css']
})
export class PaymentWaitComponent implements OnInit {

  private madh = '';
  private fakedData = [];
  private from: any;
  private to: any;
  private sr = true;
  private user: any = {};

  constructor(
    private loadingService: LoadingService,
    private formatService: FormatService,
    private clientService: ClientService,
    private storageService: StorageService,
    private waitingOrderService: WaitingOrderService,
    private popupService: PopupService
  ) { }

  ngOnInit() {

    let id = this.storageService.get("userInfo").makh;

    this.sr = screen.width <= 412? false: true;

    this.fakedData = [];

    this.loadingService.show();

    this.waitingOrderService.getByParams({makh: id}).subscribe( data => {

      this.fakedData = data;
      this.loadingService.hide();
    })
  }

  formatDate(data) {

    return this.formatService.formatDate(data);
  }

  gotoDetail(element) {

    this.clientService.openPaymentForm(element.madh).subscribe( data => {

      this.waitingOrderService.getById(element.madh).subscribe( data => {

        element = data.data;

        this.fakedData.splice(this.fakedData.indexOf(element), 1, data.data);

        this.fakedData = this.fakedData.concat([]);
      })
    })
  }

  delete(item) {

    this.loadingService.show();

    this.waitingOrderService.delete(item.madh).subscribe( success => {

      this.fakedData.splice(this.fakedData.indexOf(item), 1);

      this.fakedData = this.fakedData.concat([]);

      this.loadingService.hide();
    }, error => {

      this.loadingService.hide();
    })
  }
}
