import { Routes } from '@angular/router';
import { ListBillComponent } from './list-bill/list-bill.component';
import { WaitingListComponent } from './waiting-list/waiting-list.component';

export const ClientRouters: Routes = [
    {
        path: '',
        component: ListBillComponent
    }, {
        path: 'waiting',
        component: WaitingListComponent
    }
]