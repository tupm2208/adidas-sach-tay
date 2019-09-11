import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../core/api/user.service'
import { LoadingService } from '../../core/util/loading.service'
import { UserDialogService } from '../../core/dialog/user/user-dialog.service';
declare var $: any;

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListUserComponent implements OnInit {

  private fakedData = [];
  private limit = 0
  private skip = 0
  private total = 0

  private peopleFilter = {
    name: '',
    phone: '',
    role: ''
  };

  sc = screen.width <= 414? false: true;

  constructor(
    private userService: UserService,
    private loading: LoadingService,
    private userDialog: UserDialogService
  ) { }

  ngOnInit() {

    this.loading.show();

    this.userService.list().subscribe( data => {

      console.log("user service", data);
      this.fakedData = data.data;
      this.limit = data.limit
      this.skip = data.skip
      this.total = data.total
      setTimeout( () => { this.loading.hide() }, 50);
    }, error => {

      console.log("user error: ", error);
      setTimeout( () => { this.loading.hide() }, 50);
    })
  }

  openAddProductKind(data) {
  
    this.userDialog.openUserDetail(data).subscribe(data => {

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

  selectKind(type) {

    if(type == "admin") return "admin"

    if(type == "client") return "Khách Lẻ";

    if(type == "client2") return "Khách Buôn";

    if(type == "shiper") return "Shipper";

    if(type == "buyer") return "Người Mua";

    if(type == "receiver") return "Người Nhận";

    return "unknown";
  }
}
