import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoadingService } from '../../../core/util/loading.service';
import { FormatService } from '../../../core/util/format.service';
import { DialogService } from '../../../core/dialog/dialog.service';
import { MainService } from '../../../core/api/main.service';
import { PopupService } from '../../../core/dialog/popup/popup.service';
import { WaitingBillService } from '../../../core/api/waiting-bill.service';
import { BillService } from '../../../core/api/bill.service';
import { BillDetailService } from '../../../core/api/bill-detail.service';

declare var $: any;

@Component({
  selector: 'app-waiting-list-bill',
  templateUrl: './waiting-list-bill.component.html',
  styleUrls: ['./waiting-list-bill.component.css']
})
export class WaitingListBillComponent implements OnInit {

  private mahd = '';
  private tenkh = '';
  private fakedData:any = [];
  private from: any;
  private to: any;
  private sr = true;
  private newBill: any = [];

  constructor(
    private matDialg: MatDialog,
    private loadingService: LoadingService,
    private formatService: FormatService,
    private dialogService: DialogService,
    private mainService: MainService,
    private popupService: PopupService,
    private waitingBillService: WaitingBillService,
    private billService: BillService,
    private billDetailService: BillDetailService
  ) { }

  ngOnInit() {

    this.sr = screen.width <= 412? false: true;

    this.fakedData = [];

    this.loadingService.show();

    this.mainService.listWaitingBill({}).subscribe( data => {

      console.log("main service data: ", data);
      this.newBill = data;

      this.getAlterArray();
      // this.loadingService.hide();
    })
  }

  async getAlterArray() {

    this.newBill.push(null);

    for(let i = 0; i < this.newBill.length; i++) {

      let element = this.newBill[i];

      if(element && element.mahd < 5000 && element.makh) {

        await this.mainService.listBill({mahd: element.mahd, makh: element.makh}).toPromise().then(data => {

          if(data[0]) {

            data[0].choduyethd = element;

            this.fakedData.push(data[0]);

            this.newBill.splice(i,1);
            i--;
          }
        })
      }

      if (i == this.newBill.length - 1) {

        this.loadingService.hide();

        console.log("fake data: ", this.fakedData);

        this.fakedData = this.fakedData.concat([]);
      }
    }
  }

  formatDate(data) {

    return this.formatService.formatDate(data);
  }

  gotoDetail(element) {

    this.dialogService.openBill({user: element.user, bill: element}).subscribe( data => {

      console.log("data close: ",data);
    })
  }

  delete(item) {

    console.log("item: ", item);
    this.loadingService.show();
    
    this.waitingBillService.delete(item).subscribe( res => {

      item.choduyethd = null;
      this.loadingService.hide();

      this.popupService.showSuccess();

      console.log("delete: ", item);
    }, error => {

      this.loadingService.hide();
      this.popupService.showError(error.message);
    })
  }

  copyArray(element) {

    for(let i = 0; i< element.choduyethd.choduyetcthds.length; i++) {

      let targ = element.choduyethd.choduyetcthds[i];

      let flag = true;

      for(let j = 0; j< element.chitiethds.length; j++) {

        let des = element.chitiethds[j];

        if(des.masp == targ.masp) {

          this.formatService.copyObject(targ, des);

          flag = false;
        }
      }

      if(flag) {

        element.chitiethds.push(targ);
      }
    }

    for(let i = 0; i< element.chitiethds.length; i++) {

      let des = element.chitiethds[i];

      let flag = true;

      for(let j = 0; j < element.choduyethd.choduyetcthds.length; j++) {

        let targ = element.choduyethd.choduyetcthds[j];

        console.log("infi");

        if(targ.masp == des.masp) flag = false;
      }

      if(flag) {

        element.chitiethds.splice(i, 1);
        i--;
      }
    }
  }

  copy(object) {

    return JSON.parse(JSON.stringify(object));
  }

  accept(item) {

    if(!item.choduyethd) return;
    this.loadingService.show();

    let ob: any = this.copy(item);

    this.copyArray(ob);

    console.log("my ob: ", ob);
    this.billService.delete(ob).subscribe( res => {

      this.billService.create(ob).subscribe( cre => {

        let count = 0;

        let countEr = 0;
        
        ob.chitiethds.forEach(element => {
          
          this.billDetailService.create(element).subscribe( data => {

            count++;

            if(count == ob.chitiethds.length) {

              this.delete(ob);
              
              item.chitiethds = ob.chitiethds;
              item.choduyethd = null;

            } else if(count + countEr == ob.chitiethds.length) {

              this.popupService.showError();
              this.loadingService.hide();
            }
          }, err => {

            if(count + countEr == ob.chitiethds.length) {

              this.popupService.showError(err.message);
              this.loadingService.hide();
            }
          })
        });
      }, error => {

        this.popupService.showError(error.message);
        this.loadingService.hide();
      })
    }, error => {

      this.loadingService.hide();
      this.popupService.showError(error.message);
    })
  }
}
