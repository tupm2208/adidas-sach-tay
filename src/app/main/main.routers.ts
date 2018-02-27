import { Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { OrdersComponent } from './orders/orders.component';
import { BillsComponent } from './bills/bills.component';
import { ListProductComponent } from './list-product/list-product.component';
import { AssignOrderComponent } from './assign-order/assign-order.component';
import { HistoryComponent } from './history/history.component';
import { TestComponent } from './test/test.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ReceiverComponent } from './receiver/receiver.component';

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
    }, {
        path: 'history',
        component: HistoryComponent
    }, {
        path: 'test',
        component: TestComponent
    }, {
        path: 'product-table',
        component: ProductTableComponent
    }, {
        path: 'receiver',
        component: ReceiverComponent
    }
]