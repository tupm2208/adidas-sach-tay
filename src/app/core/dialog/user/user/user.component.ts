import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router'

import { LoadingService } from '../../../util/loading.service';
import { UserService } from '../../../api/user.service';
import { DialogService } from '../../../dialog/dialog.service';
import { PopupService } from '../../popup/popup.service';
declare var $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private isNew = false;
  private listOrderProduct = [];
  private reload = null;

  constructor(
    private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private router: Router,
    private loading: LoadingService,
    private dialogService: DialogService,
    private popupService: PopupService
  ) { }

  ngOnInit() {
    
    if(!this.data) {

      this.data = {

        name: '',
        phone: '',
        email: '',
        address: '',
        id: null,
        password: 'adidas',
        role: 'client',
        exchangeOdds: 0,
        helpFee: 1
      }
    }
  }

  order() {

    if(!this.data.id) {
      this.loading.show("user");
      this.userService.regist(this.data).subscribe( data => {
        
        console.log("regist data: ", data);
        this.data.id = data.data.id;
        this.openBillForm(data.data);
        this.loading.hide("user");
        this.data = data.data;
        this.reload = this.data
      }, error => {

        this.loading.hide("user");
      })
    } else {

      this.openBillForm(this.data);
    }
  }

  openBillForm(data) {

    

    this.dialogService.openBill({user: data, bill: null}).subscribe( data => {

      console.log("close product kind!");
    })
  }

  update() {

    this.loading.show("user");

    if (this.data.id) {
      delete this.data.password
      this.userService.update(this.data).subscribe(data => {

        console.log("data update: ", data);
        this.loading.hide("user");
        this.popupService.showSuccess().subscribe(() => {
          this.dialogRef.close(this.reload);
        })
      }, error => {
        this.popupService.showError("Xin hãy điền đầy đủ thông tin")
        this.loading.hide("user");
      })
    } else {

      this.userService.regist(this.data).subscribe( data => {

        this.data.id = data.id;
        console.log("regist data: ", data);
        this.loading.hide("user");
        this.data = data;
        this.reload = data;
        this.popupService.showSuccess().subscribe(() => {
          this.dialogRef.close(this.reload);
        })
      }, error => {

        this.popupService.showError("Xin hãy điền đầy đủ thông tin")
        this.loading.hide("user");
      })
    }
  }

  gotoHistory() {

    if(this.data.id)

      this.router.navigate(['/home/history/' + this.data.id]); 
      this.dialogRef.close();
  }
}
