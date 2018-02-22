import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SelectProductComponent } from './select-product/select-product.component';
declare var $: any;

@Component({
  selector: 'app-assign-order',
  templateUrl: './assign-order.component.html',
  styleUrls: ['./assign-order.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AssignOrderComponent implements OnInit {

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Phạm Minh Tư'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  ps1 = null;

  constructor(
    private dialog: MatDialog
   ) { }

  ngOnInit() {
  }

  openAddProductKind() {

    console.log("open");

    let productKind = this.dialog.open(SelectProductComponent);

    productKind.afterClosed().subscribe(data => {

      console.log("close product kind!");
    })
  }

  ngAfterViewInit() {

    $( () => {
      $("#sortable1, #sortable2, #sortable3").sortable({
        connectWith: ".connectedSortable"
      }).disableSelection();
    });
  }
}
