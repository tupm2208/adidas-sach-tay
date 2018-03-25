import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/api/login.service';
import { Router } from '@angular/router';
import { StorageService } from '../core/util/storage.service';
import { LoadingService } from '../core/util/loading.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private sdt;
  private mk;
  private saveFlag;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private storage: StorageService,
    private loading: LoadingService
  ) { }

  getSavedAccount() {

    this.saveFlag = this.storage.get('saveFlag');
    this.sdt = this.storage.get('sdt');
    this.mk = this.storage.get('mk');
  }

  ngOnInit() {
    
    this.getSavedAccount();
  }

  login() {
    this.loading.show();
    this.checkBeforeSaving();

    this.loginService.login({
      sdt: this.sdt,
      mk: this.mk
    }).subscribe( res => {

      console.log("login succeess: ", res);

      if(res.status) {

        this.storage.set('token', res.token);
        this.storage.set('userInfo', {makh: res.makh, maduyetkh: res.maduyetkh, maloainv: res.maloainv});
        this.gotoHome(res);
      } else {
        this.loading.hide();
      }
    }, error => {

      console.log("error: ", error);
      this.loading.hide();
    })
  }

  checkBeforeSaving() {

    if(this.saveFlag) {

      this.storage.set('saveFlag', true);
      this.storage.set('sdt', this.sdt);
      this.storage.set('mk', this.mk);
    } else {

      this.storage.set('saveFlag', false);
      this.storage.set('sdt', null);
      this.storage.set('mk', null);
    }
  }

  changeCheck() {
    
    this.saveFlag = !this.saveFlag;
  }

  gotoHome(res) {

    switch(res.maloainv) {

      case 1: this.router.navigate(['/home']); break;
      case 2: 
      case 3: this.router.navigate(['/client/']); break;
      case 4: this.router.navigate(['/payment']); break;
      case 6: this.router.navigate(['/receiver-consumer']); break;
      default: console.log("invalid request"); break;
    }
    
  }
}
