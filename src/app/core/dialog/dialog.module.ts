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

import { ErrorComponent } from './popup/error/error.component';
import { SuccessComponent } from './popup/success/success.component';

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
    SuccessComponent
  ],
  entryComponents: [
    ErrorComponent,
    SuccessComponent
  ],
  providers: [
    DialogService
  ]
})
export class DialogModule { }
