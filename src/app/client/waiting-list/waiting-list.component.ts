import { Component, OnInit } from '@angular/core';

//service
import { UserService } from '../../core/api/user.service';
import { LoadingService } from '../../core/util/loading.service';
import { DialogService } from '../../core/dialog/dialog.service';
import { FormatService } from '../../core/util/format.service';
import { UserDialogService } from '../../core/dialog/user/user-dialog.service';
import { MainService } from '../../core/api/main.service';
import { ClientService } from '../../core/dialog/client/client.service';
import { StorageService } from '../../core/util/storage.service';
import { WaitingBillService } from '../../core/api/waiting-bill.service';

declare var $:any;

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.css']
})
export class WaitingListComponent implements OnInit {

  private madh = '';
  private billData: any = [];
  private user: any = {};

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private formatService: FormatService,
    private userDialog: UserDialogService,
    private mainService: MainService,
    private clientService: ClientService,
    private storageService: StorageService,
    private waitingBillService: WaitingBillService
  ) { }

  ngOnInit() {

    this.loadingService.show();

    let id = this.storageService.get('userInfo').makh;

    this.mainService.listWaitingBill({makh: id}).subscribe( user => {

      this.billData = user;

      if(this.billData.length) {

        this.user = this.billData[0].user;
        this.loadingService.hide();
      } else {

        this.userService.getById(id).subscribe( userData => {this.user = userData.data; this.loadingService.hide();}, error => this.loadingService.hide());
      }
    }, error => {

      this.loadingService.hide();
    })
  }

  updateUser() {

    this.userDialog.openUserDetail(this.user);
  }

  gotoDetail(item) {

    this.clientService.openBook({user: this.user, bill: item}).subscribe( data => {

      this.mainService.listWaitingBill({mahd: item.mahd, makh: this.user.makh}).subscribe( data => {

        this.formatService.copyObject(data[0], item);
        
        if(!data[0]) {

          this.billData.splice(this.billData.indexOf(item), 1);
          this.billData = this.billData.concat([]);
        }
      })
    })
  }

  addBill() {

    this.clientService.openBook({user: this.user}).subscribe( data => {

      if(typeof(data) == "object") {
        
        this.billData = this.billData.concat([data]);
      }
    })
  }

  delete(item) {

    this.loadingService.show();

    this.waitingBillService.delete(item).subscribe( success => {

      console.log("success: ", success);

      this.billData.splice(this.billData.indexOf(item), 1);

      this.billData = this.billData.concat([]);

      this.loadingService.hide();
    }, error => {

      this.loadingService.hide();
    })
  }
}

