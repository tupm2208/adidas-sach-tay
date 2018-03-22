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
    }, {
        path: 'client',
        loadChildren: './client/client.module#ClientModule'
    }, {
        path: 'payment',
        loadChildren: './payment/payment.module#PaymentModule'
    }, {
        path: 'receiver-consumer',
        loadChildren: './receiver/receiver.module#ReceiverModule'
    }
]