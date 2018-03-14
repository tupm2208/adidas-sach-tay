import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatDialogModule, 
  MatButtonModule, 
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule, 
  MatRadioModule,
  MatAutocompleteModule,
  MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DialogService } from './dialog.service';
import { PopupService } from './popup/popup.service';
import { UserDialogService } from './user/user-dialog.service';

import { ErrorComponent } from './popup/error/error.component';
import { SuccessComponent } from './popup/success/success.component';
import { UploadComponent} from './product/upload/upload.component';
import { ProductKindComponent} from './product/upload/product-kind/product-kind.component';
import { ChildProductComponent } from './product/upload/child-product/child-product.component';
import { WanningComponent } from './popup/wanning/wanning.component';
import { OrderComponent} from './product/order/order.component';
import { UserComponent } from './user/user/user.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatSelectModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [
    ErrorComponent,
    SuccessComponent,
    UploadComponent,
    UploadComponent,
    ProductKindComponent,
    ChildProductComponent,
    WanningComponent,
    OrderComponent,
    UserComponent
  ],
  entryComponents: [
    ErrorComponent,
    SuccessComponent,
    UploadComponent,
    ProductKindComponent,
    WanningComponent,
    OrderComponent,
    UserComponent
  ],
  providers: [
    DialogService,
    PopupService,
    UserDialogService
  ]
})
export class DialogModule { }
