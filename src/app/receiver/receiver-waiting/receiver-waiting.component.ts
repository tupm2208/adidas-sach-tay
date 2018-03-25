import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../core/util/loading.service';
import { FormatService } from '../../core/util/format.service';
import { ClientService } from '../../core/dialog/client/client.service';
import { StorageService } from '../../core/util/storage.service';
import { WaitingReceiveService } from '../../core/api/waiting-receive.service';
import { PopupService } from '../../core/dialog/popup/popup.service';
declare var $: any;

@Component({
  selector: 'app-receiver-waiting',
  templateUrl: './receiver-waiting.component.html',
  styleUrls: ['./receiver-waiting.component.css']
})
export class ReceiverWaitingComponent implements OnInit {

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
    private waitingReceiveService: WaitingReceiveService,
    private popupService: PopupService
  ) { }

  ngOnInit() {

    let id = this.storageService.get("userInfo").makh;

    this.sr = screen.width <= 412? false: true;

    this.fakedData = [];

    this.loadingService.show();

    this.waitingReceiveService.search({makh: id}).subscribe( data => {

      this.fakedData = data;
      this.loadingService.hide();
    })
  }

  formatDate(data) {

    return this.formatService.formatDate(data);
  }

  gotoDetail(element) {

    this.clientService.openReceiverForm(element.manh).subscribe( data => {

      this.waitingReceiveService.getById(element.manh).subscribe( data => {

        element = data.data;

        this.fakedData.splice(this.fakedData.indexOf(element), 1, data.data);

        this.fakedData = this.fakedData.concat([]);
      })
    })
  }

  delete(item) {

    this.loadingService.show();

    this.waitingReceiveService.delete(item).subscribe( success => {

      this.fakedData.splice(this.fakedData.indexOf(item), 1);

      this.fakedData = this.fakedData.concat([]);

      this.loadingService.hide();
    }, error => {

      this.loadingService.hide();
    })
  }
}
