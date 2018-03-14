import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { UploadComponent } from './product/upload/upload.component';
import { OrderComponent } from './product/order/order.component';


@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openOrder(params): Observable<any> {

    return this.dialog.open(UploadComponent, {
      width: "80%",
      height:'90%',
      data: params
    }).afterClosed();
  }

  gotoOrder(params): Observable<any> {

    return this.dialog.open(OrderComponent, {
      data: params,
      maxHeight: '80%',
      height: '80%'
    }).afterClosed();
  }
}
