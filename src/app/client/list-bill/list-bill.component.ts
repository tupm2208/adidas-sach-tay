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

declare var $:any;

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.css']
})
export class ListBillComponent implements OnInit {

  private madh = '';
  private billData: any = [];
  private user: any = {};
  private waitingBills: any = [];

  constructor(
    private userService: UserService,
    private loadingService: LoadingService,
    private dialogService: DialogService,
    private formatService: FormatService,
    private userDialog: UserDialogService,
    private mainService: MainService,
    private clientService: ClientService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {

    this.loadingService.show();

    let id = this.storageService.get('userInfo').makh;

    console.log("id dep trai: ", id);

    this.mainService.listBill({makh: id}).subscribe( user => {

      this.billData = user;
      console.log("data: ", user);
      this.getChoDuyethd();

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

  getChoDuyethd() {

    this.mainService.listWaitingBill({makh: this.storageService.get('userInfo').makh}).subscribe( data => {

      this.addProp(data);
    }, error => {

      console.log("error: ", error);
    })
  }

  addProp(arr) {

    arr.forEach(element => {
      
      this.billData.forEach(ele => {

        if(ele.mahd == element.mahd) {

          ele.choduyethd = element;
        }
      })
    });
  }

  updateUser() {

    this.userDialog.openUserDetail(this.user);
  }

  gotoDetail(item) {

    if(item.choduyethd) {

      this.passWaitingBill(item.choduyethd);
    } else {

      this.passBill(item);
    }
  }

  passBill(item) {

    this.clientService.openBook({user: this.user, bill: item}).subscribe( data => {

      this.mainService.listBill({mahd: item.mahd, makh: this.user.makh}).subscribe( data => {

        this.formatService.copyObject(data[0], item);

        this.mainService.listWaitingBill({ mahd: item.mahd, makh: this.user.makh }).subscribe(data => {

          item.choduyethd = data[0];
        })
      })
    })
  }

  passWaitingBill(item) {

    this.clientService.openBook({user: this.user, bill: item}).subscribe( data => {

      this.mainService.listWaitingBill({mahd: item.mahd, makh: this.user.makh}).subscribe( data => {

        console.log("vaiilua: ", data);
        if(data.length) {

          this.formatService.copyObject(data[0], item);
        } else {

          console.log("item: ", item);
          item = null;
        }
      })
    })
  }

  addBill() {

    this.dialogService.openBill({user: this.user}).subscribe( data => {

      if(typeof(data) == "object") {
        
        this.billData = this.billData.concat([data]);
      }
    })
  }
}

