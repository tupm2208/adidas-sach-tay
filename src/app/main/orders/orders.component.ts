import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LoadingService } from '../../core/util/loading.service';
import { FormatService } from '../../core/util/format.service';
import { DialogService } from '../../core/dialog/dialog.service';
import { MainService } from '../../core/api/main.service';
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private madh = '';
  private tenkh = '';
  private fakedData = [];
  private from: any;
  private to: any;
  private sr = true;

  constructor(
    private matDialg: MatDialog,
    private loadingService: LoadingService,
    private formatService: FormatService,
    private dialogService: DialogService,
    private mainService: MainService
  ) { }

  ngOnInit() {

    this.sr = screen.width <= 412? false: true;

    this.fakedData = [];

    this.loadingService.show();

    this.mainService.listOrder({}).subscribe( data => {

      console.log("main service data: ", data);
      this.fakedData = data;
      this.loadingService.hide();
    })
  }

  formatDate(data) {

    return this.formatService.formatDate(data);
  }

  gotoDetail(element) {

    this.dialogService.gotoOrder(element.madh).subscribe( data => {

      if(data == 2) {

        this.fakedData.splice(this.fakedData.indexOf(element), 1);

        this.fakedData = this.fakedData.concat([]);
      } else if(data == 1) {

        this.mainService.listOrder({makh: element.makh, madh: element.madh}).subscribe( listItem => {

          this.fakedData.splice(this.fakedData.indexOf(element), 1, listItem[0]);
          this.fakedData = this.fakedData.concat([]);
        })
      }
    })
  }
}
