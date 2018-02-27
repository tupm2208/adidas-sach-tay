import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/api/order.service';
import { OrderDetailService } from '../../core/api/order-detail.service';
import { UserService } from '../../core/api/user.service';
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private sdt = '';
  private tenkh = '';
  private listUser = [];
  private fakedData = [];

  constructor(
    private orderService: OrderService,
    private orderDetailService: OrderDetailService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    
    this.orderService.list().subscribe( data => {

      console.log("orderService LIST: ", data);
      
      this.fakedData = data;
      this.fakedData.forEach(element => {
        
        this.userService.getById(element.makh).subscribe( user => {

          element.tenkh = user.data.tenkh,
          element.sdt = user.data.sdt
        })

        this.orderDetailService.getByParams({madh: element.madh}).subscribe( ct => {

          element.listProduct = ct;
        })
      });
    });
  }

  ngAfterViewInit() {

    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);
  }
}
