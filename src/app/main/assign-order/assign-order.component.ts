import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-assign-order',
  templateUrl: './assign-order.component.html',
  styleUrls: ['./assign-order.component.css']
})
export class AssignOrderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    $(function () {
      $("#sortable1, #sortable2").sortable({
        connectWith: ".connectedSortable"
      }).disableSelection();
    });
  }
}
