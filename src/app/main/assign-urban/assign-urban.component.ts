import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../core/util/loading.service';

import { UserService } from '../../core/api/user.service';
import { BillService } from '../../core/api/bill.service';
import { PopupService } from '../../core/dialog/popup/popup.service';

import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
declare var $: any;

@Component({
  selector: 'app-assign-urban',
  templateUrl: './assign-urban.component.html',
  styleUrls: ['./assign-urban.component.css']
})
export class AssignUrbanComponent implements OnInit {

  myControl = new FormControl();

  listBooked = [];
  name = name;
  options = [];
  selectedUser = null;
  filterUser = '';
  resultList = []
  note = ''

  ps1 = null;

  constructor(
    private userService: UserService,
    private billService: BillService,
    private loadingService: LoadingService,
    private popupService: PopupService,
   ) { }

  ngOnInit() {

    this.options = [];

    this.myControl = new FormControl();

    this.loadingService.show();

    this.getListBill();

    this.userService.search(
      {
        role: 'innerShip'
      }
    ).subscribe( data => {
      
      this.options = data.data;
    })

    this.subcribeUser();
  }

  subcribeUser() {

    this.myControl.valueChanges.subscribe( data => {

      this.filterUser = data;

      for(let i = 0; i < this.options.length; i++) {

        if(this.options[i].name == data) {

          this.selectedUser = this.options[i];

          return;
        }
      }

      this.selectedUser = null;
    })
  }

  getListBill() {

    this.billService.search({status: 5}).subscribe( data => {

      this.listBooked = data.data;
      this.listBooked.forEach(element => {
        delete element.receiveDate
      })

      console.log("book: ", this.listBooked);
      this.loadingService.hide();
    })
  }

  selectItem(item) {

    const index = this.resultList.indexOf(item)
    if (index == -1) {
      this.resultList.push(item)
    } else {
      this.resultList.splice(index, 1)
    }
  }

  refreshPage() {

    this.popupService.showSuccess().subscribe( () => {

      this.ngOnInit();
    })
  }

  submit() {

    this.loadingService.show();
    this.resultList.forEach(element => {
      element.userId = this.selectedUser.id
      element.billId = element.id
      element.note = this.note
      delete element.id
    })
  }
}
