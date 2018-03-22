import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = true;

  constructor(private router: Router) {
    this.router.events.subscribe(val => {

      if (this.router.url.indexOf('home') != -1|| this.router.url.indexOf('client') != -1|| this.router.url.indexOf('payment') != -1|| this.router.url.indexOf('receiver-consumer') != -1) {
        setTimeout(() => {

          if (this.title == false) {

            this.title = true;
            $.AdminBSB.browser.activate();
            $.AdminBSB.leftSideBar.activate();
            $.AdminBSB.navbar.activate();
            $.AdminBSB.dropdownMenu.activate();
            $.AdminBSB.input.activate();
            $.AdminBSB.select.activate();
            $.AdminBSB.search.activate();
          }
        }, 50);
      } else {
        this.title = false;
      }
    })
  }
}
