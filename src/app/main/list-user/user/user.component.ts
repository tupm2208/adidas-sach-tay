import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';
import { UploadComponent } from '../../upload/upload.component';
import { UserService } from '../../../core/api/user.service';
declare var $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private isNew = false;
  private listOrderProduct = [];
  private toggle = {
    tenkh: false,
    sdt: false,
    email: false,
    diachi: false,
    makh: false,
    mk: false,
    maloainv: false
  }

  constructor(
    private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    
    if(!this.data) {

      this.data = {

        tenkh: '',
        sdt: '',
        email: '',
        diachi: '',
        makh: null,
        mk: 'adidas',
        maloainv: 2
      }
    }
    this.initToggle(false);
  }

  initToggle(data) {

    for(let e in this.toggle) {

      this.toggle[e] = data;
    }
  }

  onBlurMethod(toggle){
    
    this.toggle[toggle] = false;
  }

  onClickMethod(toggle) {

    this.toggle[toggle] = true;
    setTimeout( () => {
      $("input[name='" + toggle +"']").focus();
    }, 100);
  }

  selectKind(type) {

    if(type == 1) return "admin";

    if(type == 2) return "Khách Lẻ";

    if(type == 3) return "Khách Buôn";

    if(type == 5) return "Shipper";

    if(type == 4) return "Người Mua";

    if(type == 6) return "Người Nhận";

    return "Chưa Chọn";
  }

  order() {

    if(!this.data.makh) {

      this.userService.regist(this.data).subscribe( data => {

        console.log("regist data: ", data);
        this.data.makh = data.data.makh;
        this.openOrderForm(data.data);
      })
    } else {

      this.openOrderForm(this.data);
    }
  }

  openOrderForm(data) {

    let productKind = this.dialog.open(UploadComponent, {
      width: "80%",
      height:'90%',
      data: {
        user: data,
        bill: null
      }
    })

    productKind.afterClosed().subscribe( data => {

      console.log("close product kind!");
    })
  }

  update() {

    if (this.data.makh) {

      this.userService.update(this.data).subscribe(data => {

        console.log("data update: ", data);
      })
    } else {

      this.userService.regist(this.data).subscribe( data => {

        this.data.makh = data.data.makh;
        console.log("regist data: ", data);

      })
    }

    this.dialogRef.close();
  }
}
