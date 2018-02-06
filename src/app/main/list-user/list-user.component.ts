import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserComponent } from './user/user.component';
declare var $: any;

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  private fakedData = [
    {
      makh: '00001',
      tenkh: "Phạm Minh Tư",
      sdt: "0981349672",
      email: "tu.phamminh.2207@gmail.com",
      diachi: "Số nhà 10b - Ngách 34 - Ngõ Thịnh Hào 1 - Đường Tôn Đức Thắng - Phường Hàng Bột - Cuận Đống Đa - TP Hà Nội",
      loaikh: 1,
      trangthai: 3
    }, {
      makh: '00002',
      tenkh: "Phạm Văn Dũng",
      sdt: "0981349672",
      email: "tu.phamminh.2207@gmail.com",
      diachi: "Số nhà 10b - Ngách 34 - Ngõ Thịnh Hào 1 - Đường Tôn Đức Thắng - Phường Hàng Bột - Cuận Đống Đa - TP Hà Nội",
      loaikh: 1,
      trangthai: 3
    }, {
      makh: '00003',
      tenkh: "Mai Thị Phương",
      sdt: "0981349672",
      email: "tu.phamminh.2207@gmail.com",
      diachi: "Số nhà 10b - Ngách 34 - Ngõ Thịnh Hào 1 - Đường Tôn Đức Thắng - Phường Hàng Bột - Cuận Đống Đa - TP Hà Nội",
      loaikh: 1,
      trangthai: 3
    }, {
      makh: '00004',
      tenkh: "Phạm Ngọc Tân",
      sdt: "0981349672",
      email: "tu.phamminh.2207@gmail.com",
      diachi: "Số nhà 10b - Ngách 34 - Ngõ Thịnh Hào 1 - Đường Tôn Đức Thắng - Phường Hàng Bột - Cuận Đống Đa - TP Hà Nội",
      loaikh: 1,
      trangthai: 3
    }, {
      makh: '00005',
      tenkh: "Ngô Trung Nghĩa",
      sdt: "0981349672",
      email: "tu.phamminh.2207@gmail.com",
      diachi: "Số nhà 10b - Ngách 34 - Ngõ Thịnh Hào 1 - Đường Tôn Đức Thắng - Phường Hàng Bột - Cuận Đống Đa - TP Hà Nội",
      loaikh: 1,
      trangthai: 3
    }, {
      makh: '00006',
      tenkh: "Trần Quang Nghĩa",
      sdt: "0981349672",
      email: "tu.phamminh.2207@gmail.com",
      diachi: "Số nhà 10b - Ngách 34 - Ngõ Thịnh Hào 1 - Đường Tôn Đức Thắng - Phường Hàng Bột - Cuận Đống Đa - TP Hà Nội",
      loaikh: 1,
      trangthai: 3
    }, {
      makh: '00007',
      tenkh: "Vũ Thị Quang",
      sdt: "0981349672",
      email: "tu.phamminh.2207@gmail.com",
      diachi: "Số nhà 10b - Ngách 34 - Ngõ Thịnh Hào 1 - Đường Tôn Đức Thắng - Phường Hàng Bột - Cuận Đống Đa - TP Hà Nội",
      loaikh: 1,
      trangthai: 3
    },
  ];

  private peopleFilter = {
    makh: '1',
    tenkh: '',
    sdt: '672'
  };

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openAddProductKind() {

    console.log("open");

    let productKind = this.dialog.open(UserComponent);

    productKind.afterClosed().subscribe(data => {

      console.log("close product kind!");
    })
  }

  ngAfterViewInit() {

    setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
  }
}
