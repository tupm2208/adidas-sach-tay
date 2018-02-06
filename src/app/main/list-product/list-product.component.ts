import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  private code = '';
  private fakedData = [
    {
      macode: 'EC0012',
      tensp: "giày đẹp",
      trangweb: "https://shop.adidas.jp/products/BB7601/",
      giaweb: "8,640",
      khoiluong: "3,4",
      tigia:"0.5"
    }, {
      macode: 'EC0013',
      tensp: "giày đẹp",
      trangweb: "https://shop.adidas.jp/products/BB7601/",
      giaweb: "8,640",
      khoiluong: "3,4",
      tigia:"0.5"
    }, {
      macode: 'EC0014',
      tensp: "giày đẹp",
      trangweb: "https://shop.adidas.jp/products/BB7601/",
      giaweb: "8,640",
      khoiluong: "3,4",
      tigia:"0.5"
    }, {
      macode: 'EC0015',
      tensp: "giày đẹp",
      trangweb: "https://shop.adidas.jp/products/BB7601/",
      giaweb: "8,640",
      khoiluong: "3,4",
      tigia:"0.5"
    }, {
      macode: 'EC0016',
      tensp: "giày đẹp",
      trangweb: "https://shop.adidas.jp/products/BB7601/",
      giaweb: "8,640",
      khoiluong: "3,4",
      tigia:"0.5"
    }, {
      macode: 'EC0017',
      tensp: "giày đẹp",
      trangweb: "https://shop.adidas.jp/products/BB7601/",
      giaweb: "8,640",
      khoiluong: "3,4",
      tigia:"0.5"
    }, 
  ]

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);
  }

}
