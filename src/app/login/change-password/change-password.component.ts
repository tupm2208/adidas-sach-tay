import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/api/user.service';
import { StorageService } from '../../core/util/storage.service';
import { LoadingService } from '../../core/util/loading.service';
import { PopupService } from '../../core/dialog/popup/popup.service';
import { Router } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  private user: any = {};
  private oldPass: any = '';
  private newPass: any = '';
  private cfPass: any = '';

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private loading: LoadingService,
    private popup: PopupService,
    private router: Router
  ) { }

  ngOnInit() {

    this.loading.show();

    let userInfor = this.storageService.get('userInfo');

    if(userInfor && userInfor.makh) {

      this.userService.getById(userInfor.makh).subscribe( data => {

        this.user = data.data;
        this.loading.hide();
        setTimeout( () => {this.initValidate();}, 100);
      }, error => {

        this.loading.hide();
      })
    }
  }

  initValidate() {

    $('#sign_up').validate({
        rules: {
            'terms': {
                required: true
            },
            'confirm': {
                equalTo: '[name="password"]'
            }
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
            $(element).parents('.form-group').append(error);
        }
    });
  }

  submit() {
    
    if(!this.checkMatch()) return;

    this.loading.show();

    this.user.mk = this.newPass;

    this.userService.update(this.user).subscribe( data => {

      this.loading.hide();

      this.popup.showSuccess().subscribe( data => { 

        this.router.navigate(['login']);
      });

    }, error => {

      this.popup.showError();
      this.loading.hide();
    })
  }

  checkMatch() {

    if(this.oldPass != this.user.mk) {

      this.popup.showWanning("Wrong password!");
      return false;
    }

    if(this.newPass != this.cfPass) {

      this.popup.showWanning("The confirm password must match the new password!");
      return false;
    }

    return true;
  }
}
