import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PopupService } from '../../../popup/popup.service';

@Component({
  selector: 'app-child-product',
  templateUrl: './child-product.component.html',
  styleUrls: ['./child-product.component.css']
})
export class ChildProductComponent implements OnInit {

  @Input() product: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Input() reservationId: any;

  constructor(
    private popup: PopupService
  ) { }

  ngOnInit() {
  }

  deleteProduct() {

    if(this.reservationId) {

      this.popup.showWanning("Không Thể Xóa Sản Phẩm Khí Chúng Còn Trong Đơn Đã Đặt Hàng");
      return;
    }

    this.delete.emit(this.product);
  }

  duplicateProduct() {

    if(this.reservationId) {

      this.popup.showWanning("Không Thể Thêm Sản Phẩm Khí Chúng Còn Trong Đơn Đã Đặt Hàng");
      return;
    }

    this.add.emit(JSON.parse(JSON.stringify(this.product)));
  }

  toggleHop() {

    if(this.reservationId) return;
    this.product.keepBox = !this.product.keepBox ? this.product.quantity : 0;
  }
}
