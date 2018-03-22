import { Routes } from '@angular/router';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { PaymentWaitComponent } from './payment-wait/payment-wait.component';

export const PaymentRoutes: Routes = [
    {
        path: '',
        component: PaymentListComponent
    }, {
        path: 'waiting',
        component: PaymentWaitComponent
    }
]