import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//service
import { OrderService } from '../../../api/order.service';
import { LoadingService } from '../../../util/loading.service';
import { PopupService } from '../../../dialog/popup/popup.service';
import { FormatService } from '../../../util/format.service';
import { WaitingOrderService } from '../../../api/waiting-order.service';

declare let $: any;

@Component({
  selector: 'app-payment-request',
  templateUrl: './payment-request.component.html',
  styleUrls: ['./payment-request.component.css']
})
export class PaymentRequestComponent implements OnInit {

  orderData: any = {};

  constructor(
    private orderService: OrderService,
    private dialogRef: MatDialogRef<PaymentRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public madh: any,
    private loadingService: LoadingService,
    private popupService: PopupService,
    private formatService: FormatService,
    private waitingOrderService: WaitingOrderService
  ) { }

  ngOnInit() {

    $('app-payment-request').parent().parent().attr('id','app-order');

    setTimeout( () => this.loadingService.show('app-order'), 0);

    this.getOrder();
  }

  getOrder() {

    this.orderService.getById(this.madh).subscribe( data => {

      this.orderData = data.data;

      console.log("data: ", data.data);
      this.waitingOrderService.getById(this.madh).subscribe( data2 => {

        console.log("data2: ", data2);
        this.formatService.copyObject(data2.data, this.orderData);
        this.loadingService.hide('app-order');
      }, error => {

        this.loadingService.hide('app-order');
        this.popupService.showError(error.message);
      })
    }, error => {

      this.loadingService.hide('app-order');
      this.popupService.showError(error.message);
    })
  }

  submit() {

    this.loadingService.show('app-order');
    
    this.waitingOrderService.delete(this.orderData.madh).subscribe( data => {

      console.log("delete ok! ", data);

      this.waitingOrderService.create(this.orderData).subscribe(data => {

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
