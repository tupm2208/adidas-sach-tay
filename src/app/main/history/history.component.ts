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

declare var $:any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private madh = '';
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
    private billService: BillService
  ) { }

  ngOnInit() {

    this.loadingService.show();

    let id = this.route.snapshot.paramMap.get('id');

    this.mainService.listBill({makh: id}).subscribe( user => {

      this.billData = user;
      console.log("data: ", user);

      if(this.billData.length) {

        this.user = this.billData[0].user;
        this.loadingService.hide();
      } else {

        this.userService.getById(id).subscribe( userData => this.user = userData.data, error => this.loadingService.hide());
      }
    }, error => {

      this.loadingService.hide();
    })
  }

  updateUser() {

    this.userDialog.openUserDetail(this.user);
  }

  openOrder(item) {

    if(!item.order) return;

    this.dialogService.gotoOrder(item.order.madh).subscribe( data => {

      this.billService.getById(item.mahd).subscribe ( bill => {
        
        for( let e in bill.data) {

          item[e] = bill.data[e];
        }

        if(!item['madh']) item.order = null;
      })
    })
  }

  gotoDetail(item) {

    this.dialogService.openBill({user: this.user, bill: item}).subscribe( data => {

      for(let i = 0; i< item.chitiethds.length; i++) {

        if(!item.chitiethds[i].mahd) {

          item.chitiethds.splice(i,1);
          i--;
        }
      }

      if(data == -2 || !item.chitiethds.length) { //delete

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
