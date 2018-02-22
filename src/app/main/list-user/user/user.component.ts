import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private name = false;
  private isNew = false;
  private text;
  private toggle = {
    name: false,
    sdt: false,
    mail: false,
    address: false,
    password: false,
    code: false,
    soluong: false,
    datcoc: false
  }

  constructor(
    private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    
    this.isNew = this.data ? false: true;
    
    this.initToggle(this.isNew);
  }

  initToggle(data) {

    for(let e in this.toggle) {

      this.toggle[e] = data;
    }
  }

  onBlurMethod(toggle){
    
    this.toggle[toggle] = false;
  }

  onClickMethod(toggle) {

    
    this.toggle[toggle] = true;
  }
}
