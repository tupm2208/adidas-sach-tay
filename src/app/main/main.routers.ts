import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const MainRoutes: Routes = [
    {
        path: '',
        component: MainComponent
    }
    
    // , {
    //     path: 'manage',
    //     loadChildren: '../manage/manage.module#ManageModule',
    // }, {
    //     path: 'list',
    //     component: ListComponent
    // }, {
    //     path: 'upload',
    //     component: UploadComponent
    // }
]