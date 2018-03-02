import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//service
import { BillService } from '../../../core/api/bill.service';
import { BillDetailService } from '../../../core/api/bill-detail.service';
import { OrderService } from '../../../core/api/order.service';
import { OrderDetailService } from '../../../core/api/order-detail.service'; 

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    private billService: BillService,
    private billDetailService: BillDetailService,
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {

    console.log("OrderCompoenent Data: ", this.data);
  }

}
