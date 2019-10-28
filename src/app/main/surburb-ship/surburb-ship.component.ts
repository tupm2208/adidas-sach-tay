import { Component, OnInit } from '@angular/core';
import { SurburbShipService } from '../../core/api/surburb-ship.service';
import { LoadingService } from '../../core/util/loading.service';
import { PopupService } from '../../core/dialog/popup/popup.service';
import { FormatService } from '../../core/util/format.service';
import { DialogService } from '../../core/dialog/dialog.service';

@Component({
  selector: 'app-surburb-ship',
  templateUrl: './surburb-ship.component.html',
  styleUrls: ['./surburb-ship.component.css']
})
export class SurburbShipComponent implements OnInit {

  shipList = []
  receiverName = ''
  receiverPhone = ''
  phone = ''
  from = ''
  to = ''

  constructor(
    private surburbShipService: SurburbShipService,
    private loadingService: LoadingService,
    private popupService: PopupService,
    private formatService: FormatService,
    private dialogService: DialogService
  ) { }

  sr = true
  ngOnInit() {
    this.getShipList()
  }

  getShipList() {
    this.loadingService.show()
    this.surburbShipService.list().subscribe(data => {
      this.shipList = data.data
      console.log(this.shipList)
      this.loadingService.hide()
    }, error => {
      this.loadingService.hide()
      this.popupService.showError("Lỗi không thể lấy được dữ liệu")
    })
  }

  gotoDetail(item) {
    const index = this.shipList.indexOf(item)
    this.dialogService.openSurburbShip(JSON.parse(JSON.stringify(item))).subscribe(signal => {
      if(signal == 1) {
        this.surburbShipService.search({id: item.id}).subscribe(data => {
          this.shipList.splice(index, 1, data.data[0])
          this.shipList = this.shipList.concat([])
        }, error => {
          console.log("cannot update")
          this.popupService.showError("Lỗi không thể cập nhật đơn ship hàng!")
        })
      } else if (signal == -1) {
        this.shipList.splice(index, 1)
        this.shipList = this.shipList.concat([])
      }
    })
  }
}
