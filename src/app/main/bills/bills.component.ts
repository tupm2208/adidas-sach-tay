import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  private tenkh = '';
  private makh = '';

  private fakedData = [
    {
      makh: "00001",
      tenkh: "Pham Minh Tu",
      mahd: "01",
      datcoc: "2,000,000",
      tienhang: "5,000,000",
      ship: "50,000",
      tong: "2,950,000"
    }, {
      makh: "00002",
      tenkh: "Pham Minh Tu",
      mahd: "01",
      datcoc: "2,000,000",
      tienhang: "5,000,000",
      ship: "50,000",
      tong: "2,950,000"
    }, {
      makh: "00003",
      tenkh: "Pham Minh Tu",
      mahd: "04",
      datcoc: "2,000,000",
      tienhang: "5,000,000",
      ship: "50,000",
      tong: "2,950,000"
    }, {
      makh: "00005",
      tenkh: "Pham Minh Tu",
      mahd: "01",
      datcoc: "2,000,000",
      tienhang: "5,000,000",
      ship: "50,000",
      tong: "2,950,000"
    }, {
      makh: "00006",
      tenkh: "Pham Minh Tu",
      mahd: "01",
      datcoc: "2,000,000",
      tienhang: "5,000,000",
      ship: "50,000",
      tong: "2,950,000"
    }, {
      makh: "00007",
      tenkh: "Pham Minh Tu",
      mahd: "01",
      datcoc: "2,000,000",
      tienhang: "5,000,000",
      ship: "50,000",
      tong: "2,950,000"
    }, 
  ]
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);
  }
}
