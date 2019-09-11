import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/api/login.service';
import { Router } from '@angular/router';
import { StorageService } from '../core/util/storage.service';
import { LoadingService } from '../core/util/loading.service';
import { UserService } from '../core/api/user.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private email;
  private password;
  private saveFlag;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private storage: StorageService,
    private loading: LoadingService,
    private userService: UserService
  ) { }

  getSavedAccount() {

    this.saveFlag = this.storage.get('saveFlag');
    this.email = this.storage.get('email');
    this.password = this.storage.get('password');
  }

  ngOnInit() {
    
    this.getSavedAccount();
  }

  login() {
    this.loading.show();
    this.checkBeforeSaving();
    const strategy = "local"
    this.loginService.login({
      strategy,
      email: this.email,
      password: this.password
    }).subscribe( res => {

      console.log("login succeess: ", res);

      this.storage.set("accessToken", res.accessToken)
      this.userService.list().subscribe(success => {
        console.log("success.data.length", success.data)
        let user: any = {}
        if (success.data.length === 1) {
          user = {...success.data[0]}
        } else {
          user.role = "admin"
        }

        this.storage.set('userInfo', user)
        this.gotoHome(user);
      }, error => {
        console.log("cannot get user")
      })

    }, error => {

      console.log("error: ", error);
      this.loading.hide();
    })
  }

  checkBeforeSaving() {

    if(this.saveFlag) {

      this.storage.set('saveFlag', true);
      this.storage.set('email', this.email);
      this.storage.set('password', this.password);
    } else {

      this.storage.set('saveFlag', false);
      this.storage.set('email', null);
      this.storage.set('password', null);
    }
  }

  changeCheck() {
    
    this.saveFlag = !this.saveFlag;
  }

  gotoHome(res) {

    switch(res.role) {

      case 'admin': this.router.navigate(['/home']); break;
      case 'client': 
      case 'client': this.router.navigate(['/client/']); break;
      case 'payment': this.router.navigate(['/payment']); break;
      case 'receiver-consumer': this.router.navigate(['/receiver-consumer']); break;
      default: console.log("invalid request"); break;
    }
    
  }
}
