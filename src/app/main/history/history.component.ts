import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

//service
import { UserService } from '../../core/api/user.service';
import { BillService } from '../../core/api/bill.service';
import { BillDetailService } from '../../core/api/bill-detail.service';
import { OrderService } from '../../core/api/order.service';
import { LoadingService } from '../../core/util/loading.service';
import { DialogService } from '../../core/dialog/dialog.service';
import { FormatService } from '../../core/util/format.service';
import { UserDialogService } from '../../core/dialog/user/user-dialog.service';

declare var $:any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private madh = '';
  user: any = {};
  private fakedData: any = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private billService: BillService,
    private billDetailService: BillDetailService,
    private orderService: OrderService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private formatService: FormatService,
    private userDialog: UserDialogService
  ) { }

  ngOnInit() {

    this.loadingService.show();

    let id = this.route.snapshot.paramMap.get('id');

    this.userService.getById(id).subscribe( user => {

      this.billDetailService.getByParams({makh: id}).subscribe( bills => {

        this.fakedData = bills;

        this.formatService.formatData(this.fakedData,"mahd");

        if(!bills.length) this.loadingService.hide();

        let dh: any = {};
        
        let count = 0;

        this.fakedData.forEach(element => {

          if(element.madh) {

            if (dh[element.madh]) {

              element.order = dh[element.madh];
              count++;
            } else {

              dh[element.madh] = {};

              this.orderService.getById(element.madh).subscribe(data => {

                console.log("donhang: ", data);
                element.order = data.data;

                for (let i in data.data) {

                  dh[element.madh][i] = data.data[i];
                }

                count++;

                if (count == this.fakedData.length) {

                  this.loadingService.hide();
                }
              }, error => {

                count++;

                if (count == this.fakedData.length) {

                  this.loadingService.hide();
                }
              })
            }
          } else count++;
        });

        console.log("user: ", user);
        console.log("bills: ", bills);
        
        this.user =user.data;
      })
    }, error => {

      this.loadingService.hide();
    })
  }

  updateUser() {

    this.userDialog.openUserDetail(this.user).subscribe( data => {

      console.log("user: ", data);
    })
  }

  openOrder(item) {

    if(!item.order) return;

    this.dialogService.gotoOrder(item.order).subscribe( data => {

      this.billService.getById(item.mahd).subscribe ( bill => {
        
        for( let e in bill.data) {

          item[e] = bill.data[e];
        }

        if(!item['madh']) item.order = null;
      })
    })
  }

  gotoDetail(item) {

    this.dialogService.openOrder({user: this.user, bill: item}).subscribe( data => {

      if(data == -2) {

        this.fakedData.splice(this.fakedData.indexOf(item),1);

        this.fakedData = this.fakedData.concat([]);

        return;
      }

      this.billService.getById(item.mahd).subscribe( data => {

        for(let e in data.data){

          item[e] = data.data[e];
        }

        this.billDetailService.getByParams({mahd: item.mahd}).subscribe( detailList => {

          if(!detailList.length) {

            this.fakedData.splice(this.fakedData.indexOf(item), 1);

            this.fakedData = this.fakedData.concat([]);
            return;
          }

            item.listMasp = detailList;

          }, error => {

          })
      })
    })
  }

  addBill() {

    this.dialogService.openOrder({user: this.user}).subscribe( data => {

      if(typeof(data) == "object") {
        
        this.fakedData = this.fakedData.concat([data]);
      }
    })
  }
}
