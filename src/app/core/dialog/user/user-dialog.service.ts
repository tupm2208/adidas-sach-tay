import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { UserComponent } from './user/user.component';

@Injectable()
export class UserDialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openUserDetail(data): Observable<any> {

    return this.dialog.open(UserComponent, {
      data: data
    }).afterClosed();
  }
}
