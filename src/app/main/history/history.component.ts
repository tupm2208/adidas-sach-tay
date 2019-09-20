import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

//service
import { UserService } from '../../core/api/user.service';
import { LoadingService } from '../../core/util/loading.service';
import { DialogService } from '../../core/dialog/dialog.service';
import { FormatService } from '../../core/util/format.service';
import { UserDialogService } from '../../core/dialog/user/user-dialog.service';
import { MainService } from '../../core/api/main.service';
import { BillService } from '../../core/api/bill.service'
import { OrderService } from '../../core/api/order.service';

declare var $:any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private reservationId = '';
  private billData: any = [];
  private user: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private formatService: FormatService,
    private userDialog: UserDialogService,
    private mainService: MainService,
    private billService: BillService,
    private orderService: OrderService
  ) { }

  ngOnInit() {

    this.loadingService.show();

    let id = this.route.snapshot.paramMap.get('id');

    this.billService.search({userId: id, include: true}).subscribe( bills => {

      this.billData = bills.data;
      console.log("data: ", bills.data);

      if(this.billData.length) {

        this.user = this.billData[0].user;
        this.loadingService.hide();
        this.billData.forEach(bill => {
          this.formatService.calculate(bill)
          this.orderService.getById(bill.reservationId).subscribe(reservation => {
            bill.order = reservation
          })
        })
      } else {

        this.userService.getById(id).subscribe( userData => this.user = userData, error => this.loadingService.hide());
      }
      this.loadingService.hide();
    }, error => {

      this.loadingService.hide();
    })
  }

  updateUser() {

    this.userDialog.openUserDetail(this.user);
  }

  openOrder(item) {

    if(!item.order) return;

    this.dialogService.gotoOrder(item.order.id).subscribe( data => {

      this.billService.getById(item.id).subscribe ( bill => {
        
        for( let e in bill) {

          item[e] = bill[e];
        }

        if(!item['reservationId']) item.order = null;
      })
    })
  }

  gotoDetail(item) {

    this.dialogService.openBill({user: this.user, bill: item}).subscribe( data => {

      for(let i = 0; i< item.billdetail.length; i++) {

        if(!item.billdetail[i].billId) {

          item.billdetail.splice(i,1);
          i--;
        }
      }

      if(data == -2 || !item.billdetail.length) { //delete

        this.billData.splice(this.billData.indexOf(item),1);

        this.billData = this.billData.concat([]);

        return;
      }
    })
  }

  addBill() {

    this.dialogService.openBill({user: this.user}).subscribe( data => {

      if(typeof(data) == "object") {
        
        this.billData = this.billData.concat([data]);
      }
    })
  }

  calculateByProp(name) {

    let sum = 0;

    this.billData.forEach(element => {
      
      sum += Number(element[name]);
    });

    return sum;
  }
}
