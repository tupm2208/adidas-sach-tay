import {Routes} from '@angular/router';

export const AppRoutes: Routes = [{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },{
        path: 'home',
        loadChildren: './main/main.module#MainModule'
    }, {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    }
]