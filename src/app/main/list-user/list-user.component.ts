import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserComponent } from './user/user.component';
import { UserService } from '../../core/api/user.service'
import { LoadingService } from '../../core/util/loading.service'
declare var $: any;

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListUserComponent implements OnInit {

  private fakedData = [];

  private peopleFilter = {
    makh: '',
    tenkh: '',
    sdt: ''
  };

  sc = screen.width <= 414? false: true;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private loading: LoadingService
  ) { }

  ngOnInit() {

    this.loading.show();

    this.userService.list().subscribe( data => {

      console.log("user service", data);
      this.fakedData = data;
      setTimeout( () => { this.loading.hide() }, 50);
    }, error => {

      console.log("user error: ", error);
      setTimeout( () => { this.loading.hide() }, 50);
    })
  }

  openAddProductKind(data) {
  
    this.dialog.open(UserComponent, {
      data: data
    }).afterClosed().subscribe(data => {

      console.log("close product kind!", data);
      if(data && this.fakedData.indexOf(data) == -1) {

        this.fakedData = this.fakedData.concat([data]);
      }
    })
  }

  cutAddress(str) {

    if(str && str.length > 15) {

      return str.substring(0,14) + '...';
    }

    return str
  }

  mouseEnter(abc) {

    console.log("abc: ", abc);
  }

  mouseLeave(bcd) {

    console.log("bcd: ", bcd);
  }

  selectKind(type) {

    if(type == 1) return "admin"

    if(type == 2) return "Khách Lẻ";

    if(type == 3) return "Khách Buôn";

    if(type == 5) return "Shipper";

    if(type == 4) return "Người Mua";

    if(type == 6) return "Người Nhận";

    return "unknown";
  }
}
