import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './core/util/storage.service';
import { ExchangeService } from './core/api/exchange.service';
import { LoadingService } from './core/util/loading.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = true;
  exchangeValue: Number;
  realRate: Number;

  role: Boolean;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private exchangeService: ExchangeService,
    private loading: LoadingService
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

            this.role = info && info.role == 'admin';

            this.realRate = this.storageService.get('exchangeValue');
          }
        }, 50);
      } else {
        this.title = false;
      }
    })
  }

  openRateInput() {

    this.exchangeValue = this.realRate;
    $('.search-bar').addClass('open');
  }

  closeRateInput() {

    $('.search-bar').removeClass('open');
  }

  saveRate() {
    this.loading.show()
    
    this.exchangeService.create({
      value: this.exchangeValue,
      createdDate: new Date()
    }).subscribe(data => {
      console.log("create new exchange rate: ", data)
      this.realRate = this.exchangeValue;

      this.storageService.set('exchangeValue',this.realRate);
      this.storageService.set('exchangeId', data.id)
      this.closeRateInput();
      this.loading.hide()
    }, error => {
      this.loading.hide()
    })
  }
}
