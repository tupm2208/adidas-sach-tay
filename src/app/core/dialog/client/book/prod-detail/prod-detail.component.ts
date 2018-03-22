import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PopupService } from '../../../popup/popup.service';

@Component({
  selector: 'app-prod-detail',
  templateUrl: './prod-detail.component.html',
  styleUrls: ['./prod-detail.component.css']
})
export class ProdDetailComponent implements OnInit {

  @Input() product: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() add: EventEmitter<any> = new EventEmitter();
  @Input() madh: any;

  constructor(
    private popup: PopupService
  ) { }

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
