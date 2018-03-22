import { Component, OnInit } from '@angular/core';
import { MainService } from '../../core/api/main.service';
import { LoadingService } from '../../core/util/loading.service'
import { FormatService } from '../../core/util/format.service';
import { DialogService } from '../../core/dialog/dialog.service';

@Component({
  selector: 'app-receive-list',
  templateUrl: './receive-list.component.html',
  styleUrls: ['./receive-list.component.css']
})
export class ReceiveListComponent implements OnInit {

  private receiveList: any = [];
  private sc: any = screen.width <= 414? false: true;
  private tenkh = '';
  private madh = '';
  private from = '';
  private to = '';
  private trangthai:any = '';

  constructor(
    private mainService: MainService,
    private loadingService: LoadingService,
    private formatService: FormatService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {

    this.loadingService.show();

    this.mainService.listReceive({}).subscribe( data => {

      this.receiveList = data;
      this.loadingService.hide();
      console.log("data: ", data);
    }, error => {

      this.loadingService.hide();
    })
  }

  openReceiveDetail(element) {

    this.dialogService.openReceive(element.manh).subscribe( data => {

      this.mainService.listReceive({manh: element.manh}).subscribe( data => {

        if(!data.length) {

          this.receiveList.splice(this.receiveList.indexOf(element), 1);
          this.receiveList = this.receiveList.concat([]);
        } else {

          this.receiveList.splice(this.receiveList.indexOf(element), 1, data[0]);
          this.receiveList = this.receiveList.concat([]);
        }
      })
    })
  }
}
