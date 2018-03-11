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

import { ErrorComponent } from './popup/error/error.component';
import { SuccessComponent } from './popup/success/success.component';
import { UploadComponent} from './product/upload/upload.component';
import { ProductKindComponent} from './product/upload/product-kind/product-kind.component';
import { ChildProductComponent } from './product/upload/child-product/child-product.component';

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
    ChildProductComponent
  ],
  entryComponents: [
    ErrorComponent,
    SuccessComponent,
    UploadComponent,
    ProductKindComponent,
  ],
  providers: [
    DialogService,
    PopupService
  ]
})
export class DialogModule { }
