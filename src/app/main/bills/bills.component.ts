import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BillComponent } from './bill/bill.component';

import { DialogService } from '../../core/dialog/dialog.service';
import { BillService } from '../../core/api/bill.service';
import { BillDetailService } from '../../core/api/bill-detail.service';
import { UserService } from '../../core/api/user.service';
import { LoadingService } from '../../core/util/loading.service';

declare var $: any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  private tenkh = '';
  private makh = '';

  private fakedData = [];

  constructor(
    private dialog: MatDialog,
    private billService: BillService,
    private billDetailService: BillDetailService,
    private userService: UserService,
    private dialogService: DialogService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {

    this.loadingService.show();

    this.billService.list().subscribe( data => {

      let userList: any = {};

      console.log("bill List: ", data);
      
      this.fakedData = data;
      let i = 0;
      this.fakedData.forEach(element => {
        
        if(userList[element.makh]) {

          element.user = userList[element.makh]
        } else {

          userList[element.makh] = {};
          element.user = userList[element.makh];
          this.userService.getById(element.makh).subscribe(user => {
            
            userList[element.makh].tenkh = user.data.tenkh,
            userList[element.makh].sdt = user.data.sdt
            userList[element.makh].makh = user.data.makh;
          })
        }

        this.billDetailService.getByParams({mahd: element.mahd}).subscribe( ct => {

          element.listMasp = ct;
          i += 1;
          
          if(i == this.fakedData.length) {

            this.loadingService.hide();
          }
        })
      });
    });
  }

  openAddProductKind(item) {

    let productKind = this.dialog.open(BillComponent, {
      height: "80%",
      width: "80%",
      data: item
    })

    productKind.afterClosed().subscribe( data => {

      console.log("data close");
    })
  }

  order(item) {

    this.dialogService.openOrder({user: item.user}).subscribe( data => {

      console.log("data: order: ", data);
    })
  }

  update(item) {

    this.dialogService.openOrder({user: item.user, bill: item});
  }
}
