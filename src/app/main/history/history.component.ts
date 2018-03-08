import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

//service
import { UserService } from '../../core/api/user.service';
import { BillService } from '../../core/api/bill.service';
import { BillDetailService } from '../../core/api/bill-detail.service';

declare var $:any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private code = '';
  private fakedData = [
    {
      mahd: '011',
      ngay: "22-12-2017",
      masp: "EC2001",
      ship: "20,000",
      datcoc: '2,000,000',
      tonggt: "5,000,000",
      sum:"2,980,000",
      trangthai: "Hoàn Tất"
    }
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private billService: BillService,
    private billDetailService: BillDetailService,
  ) { }

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');

    this.userService.getById(id).subscribe( user => {

      this.billService.search({makh: id}).subscribe( bills => {

        bills.forEach(element => {
          
          this.billDetailService.getByParams({mahd: element.mahd}).subscribe( detailList => {

            element.list = detailList;
          })
        });

        console.log("user: ", user);
        console.log("bills: ", bills);
      })
    })
  }

  ngAfterViewInit() {

    setTimeout(function() { $('.page-loader-wrapper').fadeOut(); }, 50);
  }
}
