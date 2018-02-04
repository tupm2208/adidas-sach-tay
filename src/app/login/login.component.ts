import { Component, OnInit } from '@angular/core';
import { LoginService } from '../core/api/login.service'
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    
    this.loginService.login({
      sdt: '1234',
      mk: 'nopass'
    }).subscribe( res => {

      console.log("success: ", res);
    }, error => {

      console.log("error: ", error);
    })
  }
}
