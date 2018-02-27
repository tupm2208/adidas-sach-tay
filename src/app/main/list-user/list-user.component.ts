import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UserComponent } from './user/user.component';
import { UserService } from '../../core/api/user.service'
declare var $: any;

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  private fakedData = [];

  private peopleFilter = {
    makh: '',
    tenkh: '',
    sdt: ''
  };

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit() {

    this.userService.list().subscribe( data => {

      console.log("user service", data);
      this.fakedData = data;
      setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
    }, error => {

      console.log("user error: ", error);
      setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);
    })
  }

  openAddProductKind(data) {

    console.log("open");

    let productKind = this.dialog.open(UserComponent, {
      data: data
    });

    productKind.afterClosed().subscribe(data => {

      console.log("close product kind!");
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
}
