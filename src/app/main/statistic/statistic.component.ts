import { Component, OnInit } from '@angular/core';
import { MainService } from '../../core/api/main.service';
import { FormatService } from '../../core/util/format.service';
import { LoadingService } from '../../core/util/loading.service';
import { ReceiveService } from '../../core/api/receive.service';
import { OrderService } from '../../core/api/order.service';
import { BillService } from '../../core/api/bill.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  private receiveData: any = [];
  private from: any = '';
  private to: any = '';

  constructor(
    private mainService: MainService,
    private formatService: FormatService,
    private loadingService: LoadingService,
    private receiverService: ReceiveService,
    private orderService: OrderService,
    private billService: BillService
  ) { }

  ngOnInit() {

    this.loadingService.show();
    this.receiverService.search({status: 8, include: true}).subscribe( data => {

      this.receiveData = data.data;

      this.receiveData.forEach(receiver => {
        this.orderService.getByParams({receiverId: receiver.id, include: true}).subscribe(reservations => {
          receiver.orders = reservations.data
          receiver.orders.forEach(order => {
            this.billService.search({reservationId: order.id, include: true}).subscribe(bills => {
              order.bills = bills.data
              this.cal();
            })
          })
          
        })
      })

      console.log("data: ", data);
      
    })
  }

  calculateByProp(item, name, name2?): number {

    let sum = 0;

    item.forEach(element => {
      
      element[name2] ? sum += Number(element[name]) * Number(element[name2]): sum+= Number(element[name]);

      if(!name2 && name =='thanhtien') console.log("e: ", element.thanhtien);
    });

    return sum;
  }

  cal() {

    this.receiveData.forEach(element => {
      
      console.log("abc: ", element);
      element.noReceive = element.unitPrice * element.weight + Number(element.surcharge);

      element.tongthu = 0;

      element.orders.forEach(ele => {

        console.log("abcd: ", element);
        
        ele.noOrder = ele.yenAmount * ele.exchangeRate;

        ele.noBill = this.calculateByProp(ele.bills, 'thanhtien');
      });

      element.tongchi = Number(element.noReceive) + this.calculateByProp(element.orders, 'noOrder');
      element.tongthu = this.calculateByProp(element.orders,'noBill');
    });

    this.loadingService.hide();
  }
}
