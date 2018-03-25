import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { BookComponent } from './book/book.component';
import { PaymentRequestComponent } from './payment-request/payment-request.component';
import { ReceiverRequestComponent } from './receiver-request/receiver-request.component';
import { ReceiverWeightComponent } from './receiver-weight/receiver-weight.component';

@Injectable()
export class ClientService {

  constructor(
    private dialog: MatDialog
  ) { }

  openBook(params): Observable<any> {

    return this.dialog.open(BookComponent, {
      data: params,
      height:'90%',
      width: "80%"
    }).afterClosed();
  }

  openPaymentForm(params): Observable<any> {

    return this.dialog.open(PaymentRequestComponent, {
      data: params,
      height:'90%'
    }).afterClosed();
  }

  openReceiverForm(params): Observable<any> {

    return this.dialog.open(ReceiverRequestComponent, {
      data: params,
      height:'90%'
    }).afterClosed();
  }

  openReceiverWeightForm(params): Observable<any> {

    return this.dialog.open(ReceiverWeightComponent, {
      data: params
    }).afterClosed();
  }
}
