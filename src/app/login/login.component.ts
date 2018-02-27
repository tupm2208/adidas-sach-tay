import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/api/login.service';
import { Router } from '@angular/router';
import { StorageService } from '../core/util/storage.service';
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

  constructor(private loginService: LoginService, private router: Router, private storage: StorageService) { }

  getSavedAccount() {

    this.saveFlag = this.storage.get('saveFlag');
    this.sdt = this.storage.get('sdt');
    this.mk = this.storage.get('mk');
  }

  ngOnInit() {
    
    this.getSavedAccount();
  }

  ngAfterViewInit() {
    
    // $(function () {
    //   $('#sign_in').validate({
    //       highlight: function (input) {
    //           console.log(input);
    //           $(input).parents('.form-line').addClass('error');
    //       },
    //       unhighlight: function (input) {
    //           $(input).parents('.form-line').removeClass('error');
    //       },
    //       errorPlacement: function (error, element) {
    //           $(element).parents('.input-group').append(error);
    //       }
    //   });
    // });

    setTimeout( () => $('.page-loader-wrapper').fadeOut(), 50);
  }

  login() {
    $('.page-loader-wrapper').fadeIn();
    this.checkBeforeSaving();

    this.loginService.login({
      sdt: this.sdt,
      mk: this.mk
    }).subscribe( res => {

      if(res.status) {

        this.storage.set('token', res.token);
        this.gotoHome();
      } else {
        $('.page-loader-wrapper').fadeOut();
      }
    }, error => {

      console.log("error: ", error);
      $('.page-loader-wrapper').fadeOut();
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

  gotoHome() {

    this.router.navigate(['/home']); 
  }
}
