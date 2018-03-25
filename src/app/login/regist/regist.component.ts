import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/api/user.service';
import { StorageService } from '../../core/util/storage.service';
import { LoadingService } from '../../core/util/loading.service';
import { PopupService } from '../../core/dialog/popup/popup.service';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private loading: LoadingService,
    private popup: PopupService,
    private router: Router
  ){ }

  ngOnInit() {
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
}
