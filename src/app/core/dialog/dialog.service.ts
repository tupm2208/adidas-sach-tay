import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { UploadComponent } from './product/upload/upload.component';
import { OrderComponent } from './product/order/order.component';
import { ReceiveDetailComponent } from './product/receive-detail/receive-detail.component';


@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openBill(params): Observable<any> {

    return this.dialog.open(UploadComponent, {
      width: "80%",
      height:'90%',
      data: params
    }).afterClosed();
  }

  gotoOrder(params): Observable<any> {

    return this.dialog.open(OrderComponent, {
      data: params,
      height: '80%'
    }).afterClosed();
  }

  openReceive(manh): Observable<any> {

    return this.dialog.open( ReceiveDetailComponent, {
      data: manh,
      height: '80%'
    }).afterClosed();
  }
}
