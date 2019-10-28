import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PopupService } from '../../popup/popup.service';
import { LoadingService } from '../../../util/loading.service';
import { FormatService } from '../../../util/format.service';
import { SurburbShipService } from '../../../api/surburb-ship.service';
import { BillService } from '../../../api/bill.service';

declare let $: any;

@Component({
  selector: 'app-surburb',
  templateUrl: './surburb.component.html',
  styleUrls: ['./surburb.component.css']
})
export class SurburbComponent implements OnInit {

  private surburbData: any = {};
  private originalStatus = 0

  constructor(
    private dialogRef: MatDialogRef<SurburbComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private popupDialog: PopupService,
    private loading: LoadingService,
    private cdRef:ChangeDetectorRef,
    private formatService: FormatService,
    private surburbService: SurburbShipService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.surburbData = this.data
    this.originalStatus = this.data.status
  }

  ngAfterViewInit() {

    $('app-surburb').parent().parent().attr('id','surburb');
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  delete() {
    // this.popupDialog.showError
    this.surburbService.delete(this.surburbData.id).subscribe(data => {
      this.billService.update({id: this.surburbData.billId, status: 5}).subscribe(data => {
        this.showSuccess(-1) // remove signal        
        console.log("deleted!")
      })
    })
  }

  checkValid() {

  }

  update() {

    if(!this.surburbData.id) {
      this.dialogRef.close()
      return
    }

    this.loading.show('surburb')

    this.surburbService.update(this.surburbData).subscribe(data => {
      this.showSuccess(1) // update signal
    }, error => {
      this.showError()
    })

    if (this.originalStatus !== this.data.status) {
      this.billService.update({id: this.surburbData.billId, status: this.data.status}).subscribe(data => {
        this.showSuccess(1) // remove signal        
      })
    }
  }

  showError() {

    this.loading.hide('surburb');
    this.dialogRef.updateSize()
    this.popupDialog.showError("có lỗi xảy ra").subscribe( data => {

      console.log("close error!");
    })
  }

  showSuccess(type) {

    this.loading.hide('surburb');
    this.dialogRef.updateSize()
    this.popupDialog.showSuccess().subscribe( data => {

      this.dialogRef.close(type);
    })
  }
}
