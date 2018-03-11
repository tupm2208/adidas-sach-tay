import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  isMobie = true;

  constructor(
    private dialogRef: MatDialogRef<BillComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit() {
    
    this.isMobie = screen.width <= 414? false: true;

    console.log("this.data: ", this.data);
  }

  subTotal() {

    let sum = 0;

    this.data.listMasp.forEach(element => {
      
      sum += element.giaweb * element.trietkhau * element.tigia;
    });

    return sum;
  }

}

//theem trường hộp và ghi chú