import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private makh = '';
  private tenkh = '';

  private fakedData = [
    {
      makh: "00001",
      tenkh: "Pham Minh Tu",
      madh: "01",
      ngaygiao: "2,000,000",
      ngayve: "5,000,000",
      tong: "50,000",
      trangthai: "2,950,000"
    }, {
      makh: "00002",
      tenkh: "Pham Minh Tu",
      madh: "01",
      ngaygiao: "2,000,000",
      ngayve: "5,000,000",
      tong: "50,000",
      trangthai: "2,950,000"
    }, {
      makh: "00003",
      tenkh: "Pham Minh Tu",
      madh: "04",
      ngaygiao: "2,000,000",
      ngayve: "5,000,000",
      tong: "50,000",
      trangthai: "2,950,000"
    }, {
      makh: "00005",
      tenkh: "Pham Minh Tu",
      madh: "01",
      ngaygiao: "2,000,000",
      ngayve: "5,000,000",
      tong: "50,000",
      trangthai: "2,950,000"
    }, {
      makh: "00006",
      tenkh: "Pham Minh Tu",
      madh: "01",
      ngaygiao: "2,000,000",
      ngayve: "5,000,000",
      tong: "50,000",
      trangthai: "2,950,000"
    }, {
      makh: "00007",
      tenkh: "Pham Minh Tu",
      madh: "01",
      ngaygiao: "2,000,000",
      ngayve: "5,000,000",
      tong: "50,000",
      trangthai: "2,950,000"
    }, 
  ]

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);
  }
}
