import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PopupService } from '../../popup/popup.service';
import { LoadingService } from '../../../util/loading.service';
import { FormatService } from '../../../util/format.service';
import { UrbanShipService } from '../../../api/urban-ship.service';
import { BillService } from '../../../api/bill.service';

declare let $: any;

@Component({
  selector: 'app-urban',
  templateUrl: './urban.component.html',
  styleUrls: ['./urban.component.css']
})
export class UrbanComponent implements OnInit {

  private urbanData: any = {};

  constructor(
    private dialogRef: MatDialogRef<UrbanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private popupDialog: PopupService,
    private loading: LoadingService,
    private cdRef:ChangeDetectorRef,
    private formatService: FormatService,
    private urbanService: UrbanShipService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.urbanData = this.data
  }

  ngAfterViewInit() {

    $('app-urban').parent().parent().attr('id','urban');
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  delete() {
    // this.popupDialog.showError
    this.urbanService.delete(this.urbanData.id).subscribe(data => {
      this.billService.update({id: this.urbanData.billId, status: 5}).subscribe(data => {
        this.showSuccess(-1) // remove signal        
        console.log("deleted!")
      })
    })
  }

  checkValid() {

  }

  update() {

    this.loading.show('urban')

    this.urbanService.update(this.urbanData).subscribe(data => {
      this.showSuccess(1) // update signal
    }, error => {
      this.showError()
    })
  }

  showError() {

    this.loading.hide('urban');
    this.dialogRef.updateSize()
    this.popupDialog.showError("có lỗi xảy ra").subscribe( data => {

      console.log("close error!");
    })
  }

  showSuccess(type) {

    this.loading.hide('urban');
    this.dialogRef.updateSize()
    this.popupDialog.showSuccess().subscribe( data => {

      this.dialogRef.close(type);
    })
  }
}
