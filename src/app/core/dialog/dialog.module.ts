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
import { ChildProductComponent } from './product/upload/child-product/child-product.component';
import { WanningComponent } from './popup/wanning/wanning.component';
import { OrderComponent} from './product/order/order.component';
import { UserComponent } from './user/user/user.component';
import { ReceiveDetailComponent } from './product/receive-detail/receive-detail.component';
import { PipeModule } from '../../pipe/pipe.module';
import { BookComponent } from './client/book/book.component';
import { ProdDetailComponent } from './client/book/prod-detail/prod-detail.component';
import { ClientService } from './client/client.service';
import { PaymentRequestComponent } from './client/payment-request/payment-request.component';
import { ReceiverRequestComponent } from './client/receiver-request/receiver-request.component';
import { ReceiverWeightComponent } from './client/receiver-weight/receiver-weight.component';
import { UrbanComponent } from './ship/urban/urban.component';
import { SurburbComponent } from './ship/surburb/surburb.component';

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
    ReactiveFormsModule,
    PipeModule
  ],
  declarations: [
    ErrorComponent,
    SuccessComponent,
    UploadComponent,
    UploadComponent,
    ChildProductComponent,
    WanningComponent,
    OrderComponent,
    UserComponent,
    ReceiveDetailComponent,
    BookComponent,
    ProdDetailComponent,
    PaymentRequestComponent,
    ReceiverRequestComponent,
    ReceiverWeightComponent,
    UrbanComponent,
    SurburbComponent
  ],
  entryComponents: [
    ErrorComponent,
    SuccessComponent,
    UploadComponent,
    WanningComponent,
    OrderComponent,
    UserComponent,
    ReceiveDetailComponent,
    BookComponent,
    PaymentRequestComponent,
    ReceiverRequestComponent,
    ReceiverWeightComponent,
    UrbanComponent,
    SurburbComponent
  ],
  providers: [
    DialogService,
    PopupService,
    UserDialogService,
    ClientService
  ]
})
export class DialogModule { }
