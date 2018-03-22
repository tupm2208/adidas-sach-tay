import { Routes } from '@angular/router';
import { ReceiverListComponent } from './receiver-list/receiver-list.component';
import { ReceiverWaitingComponent } from './receiver-waiting/receiver-waiting.component';

export const ReceiverRouters: Routes = [
    {
        path: '',
        component: ReceiverListComponent
    }, {
        path: 'waiting',
        component: ReceiverWaitingComponent
    }
]