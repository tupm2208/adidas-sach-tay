import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private code = '';
  private fakedData = [
    {
      mahd: '011',
      ngay: "22-12-2017",
      masp: "EC2001",
      ship: "20,000",
      datcoc: '2,000,000',
      tonggt: "5,000,000",
      sum:"2,980,000",
      trangthai: "Hoàn Tất"
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);
  }
}
