import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-child-product',
  templateUrl: './child-product.component.html',
  styleUrls: ['./child-product.component.css']
})
export class ChildProductComponent implements OnInit {

  @Input() product: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() add: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteProduct() {

    this.delete.emit(this.product);
  }

  duplicateProduct() {

    this.add.emit(JSON.parse(JSON.stringify(this.product)));
  }

  toggleHop() {

    this.product.giuhop = !this.product.giuhop ? this.product.soluong : 0;
  }
}
