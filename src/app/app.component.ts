import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './core/util/storage.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = true;
  tigia: Number;
  realRate: Number;

  maloainv: Boolean;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
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

            let info = this.storageService.get('userInfo');

            this.maloainv = info && info.maloainv == 1;

            this.realRate = this.storageService.get('tigia');
          }
        }, 50);
      } else {
        this.title = false;
      }
    })
  }

  openRateInput() {

    this.tigia = this.realRate;
    $('.search-bar').addClass('open');
  }

  closeRateInput() {

    $('.search-bar').removeClass('open');
  }

  saveRate() {

    this.realRate = this.tigia;

    this.storageService.set('tigia',this.realRate);

    this.closeRateInput();
  }
}
