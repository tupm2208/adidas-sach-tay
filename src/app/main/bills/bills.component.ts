import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BillComponent } from './bill/bill.component';

import { DialogService } from '../../core/dialog/dialog.service';
import { BillService } from '../../core/api/bill.service';
import { BillDetailService } from '../../core/api/bill-detail.service';
import { UserService } from '../../core/api/user.service';
import { LoadingService } from '../../core/util/loading.service';
import { FormatService } from '../../core/util/format.service';

declare var $: any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  private tenkh = '';
  private tendh = '';
  private from: any = '';
  private to: any = '';
  private sr = true;

  private fakedData = [];

  constructor(
    private dialog: MatDialog,
    private billService: BillService,
    private billDetailService: BillDetailService,
    private userService: UserService,
    private dialogService: DialogService,
    private loadingService: LoadingService,
    private formatService: FormatService
  ) { }

  ngOnInit() {

    this.sr = screen.width <= 412? false: true;

    this.loadingService.show();

    this.billService.list().subscribe( data => {

      let userList: any = {};

      console.log("bill List: ", data);
      
      if(!data.length) this.loadingService.hide();

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
    }, error => {

      this.loadingService.hide();
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

    this.dialogService.openOrder({user: item.user, bill: item}).subscribe( data => {

      if(!item.listMasp.length) {

        this.fakedData.splice(this.fakedData.indexOf(item), 1);

        this.fakedData = this.fakedData.concat([]);
      }
    })
  }
}
