import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.css']
})
export class ReceiverComponent implements OnInit {

  private sdt = '';
  private tenkh = '';

  private fakedData = [
    {
      sdt: "0981349672",
      tenkh: "Pham Minh Tu",
      masp: "01",
      ngay: "22-07-2018",
      gia: "5,000,000",
      datcoc: "500,000",
      ghichu: "adidas2018",
      donhang: "EC2014 - 2",
      trangthai: "Đang Về"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);
  }
}
