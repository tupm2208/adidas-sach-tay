import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//service
import { ReceiveService } from '../../../api/receive.service';
import { LoadingService } from '../../../util/loading.service';
import { PopupService } from '../../../dialog/popup/popup.service';
import { FormatService } from '../../../util/format.service';
import { WaitingReceiveService } from '../../../api/waiting-receive.service';

declare let $: any;

@Component({
  selector: 'app-receiver-request',
  templateUrl: './receiver-request.component.html',
  styleUrls: ['./receiver-request.component.css']
})
export class ReceiverRequestComponent implements OnInit {

  orderData: any = {};

  constructor(
    private receiveService: ReceiveService,
    private dialogRef: MatDialogRef<ReceiverRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public manh: any,
    private loadingService: LoadingService,
    private popupService: PopupService,
    private formatService: FormatService,
    private waitingReceiveService: WaitingReceiveService
  ) { }

  ngOnInit() {

    $('app-receiver-request').parent().parent().attr('id','app-order');

    setTimeout( () => this.loadingService.show('app-order'), 0);

    this.getOrder();
  }

  getOrder() {

    this.receiveService.getById(this.manh).subscribe( data => {

      this.orderData = data.data;

      console.log("data: ", data.data);
      this.waitingReceiveService.getById(this.manh).subscribe( data2 => {

        console.log("data2: ", data2);
        this.formatService.copyObject(data2.data, this.orderData);
        this.loadingService.hide('app-order');
      }, error => {

        this.loadingService.hide('app-order');
      })
    }, error => {

      this.loadingService.hide('app-order');
      this.popupService.showError(error.message);
    })
  }

  submit() {

    this.loadingService.show('app-order');

    console.log("orderdata: ", this.orderData);
    
    this.waitingReceiveService.delete(this.orderData).subscribe( data => {

      console.log("delete ok! ", data);

      this.waitingReceiveService.create(this.orderData).subscribe(data => {

        console.log("create ok!", data);
        this.loadingService.hide('app-order');
        this.popupService.showSuccess().subscribe( () => this.dialogRef.close());
      }, error => {

        this.loadingService.hide('app-order');
        this.popupService.showError(error.message).subscribe( () => this.dialogRef.close());
      })
    }, error => {

      this.loadingService.hide('app-order');
      this.popupService.showError(error.message);
    })
  }

}
