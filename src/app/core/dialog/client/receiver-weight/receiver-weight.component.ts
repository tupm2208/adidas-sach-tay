import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

//service
import { LoadingService } from '../../../util/loading.service';
import { PopupService } from '../../../dialog/popup/popup.service';

declare let $: any;

@Component({
  selector: 'app-receiver-weight',
  templateUrl: './receiver-weight.component.html',
  styleUrls: ['./receiver-weight.component.css']
})
export class ReceiverWeightComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ReceiverWeightComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loadingService: LoadingService,
    private popupService: PopupService
  ) { }

  ngOnInit() {

    console.log(" data: ", this.data);

  }

  submit() {  

    this.dialogRef.close();
  }

}
