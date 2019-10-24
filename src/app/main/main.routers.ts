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
import { ReceiveListComponent } from './receive-list/receive-list.component';
import { WaitingListOrderComponent } from './orders/waiting-list-order/waiting-list-order.component';
import { WaitingListReceiverComponent } from './receive-list/waiting-list-receiver/waiting-list-receiver.component';
import { WaitingListBillComponent } from './bills/waiting-list-bill/waiting-list-bill.component';
import { OrderHistoryComponent } from './orders/order-history/order-history.component';
import { ReceiveHistoryComponent } from './receive-list/receive-history/receive-history.component';
import { StatisticComponent } from './statistic/statistic.component';
import { AssignSurburbComponent } from './assign-surburb/assign-surburb.component';
import { AssignUrbanComponent } from './assign-urban/assign-urban.component';
import { SurburbShipComponent } from './surburb-ship/surburb-ship.component';
import { UrbanShipComponent } from './urban-ship/urban-ship.component';


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
        path: 'history/:id',
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
    }, {
        path: 'receive-list',
        component: ReceiveListComponent
    }, {
        path: 'bills/waiting-list-bill',
        component: WaitingListBillComponent
    }, {
        path: 'receiver/waiting-list-receiver',
        component: WaitingListReceiverComponent
    }, {
        path: 'orders/waiting-list-order',
        component: WaitingListOrderComponent
    }, {
        path: 'orders/history/:id',
        component: OrderHistoryComponent
    }, {
        path: 'receiver/history/:id',
        component: ReceiveHistoryComponent
    }, {
        path: 'statistic',
        component: StatisticComponent
    }, {
        path: 'assign-surburb',
        component: AssignSurburbComponent
    }, {
        path: 'assign-urban',
        component: AssignUrbanComponent
    }, {
        path: 'surburb-list',
        component: SurburbShipComponent
    }, {
        path: 'urban-list',
        component: UrbanShipComponent
    }
]