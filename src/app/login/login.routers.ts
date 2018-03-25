import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegistComponent } from './regist/regist.component';
import { ChangePasswordComponent } from './change-password/change-password.component';  

export const LoginRouters: Routes = [
    {
        path: '',
        component: LoginComponent
    }, {
        path: 'regist',
        component: RegistComponent
    }, {
        path: 'change-password',
        component: ChangePasswordComponent
    }
]