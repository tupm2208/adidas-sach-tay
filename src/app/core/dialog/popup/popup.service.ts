import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { ErrorComponent } from './error/error.component';
import { SuccessComponent } from './success/success.component';

@Injectable()
export class PopupService {

  constructor(
    private dialog: MatDialog
  ) { }

  showSuccess(): Observable<any> {

    return this.dialog.open(SuccessComponent).afterClosed();
  }

  showError(): Observable<any> {

    return this.dialog.open(ErrorComponent).afterClosed();
  }

}
