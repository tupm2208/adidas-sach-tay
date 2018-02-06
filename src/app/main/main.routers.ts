import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { OrdersComponent } from './orders/orders.component';
import { BillsComponent } from './bills/bills.component';
import { ListProductComponent } from './list-product/list-product.component';
import { AssignOrderComponent } from './assign-order/assign-order.component';

export const MainRoutes: Routes = [
    {
        path: '',
        component: MainComponent
    },{
        path: 'orders',
        component: OrdersComponent
    }, {
        path: 'bills',
        component: BillsComponent
    }, {
        path: 'products',
        component: ListProductComponent
    }, {
        path: 'assignment',
        component: AssignOrderComponent
    }
]