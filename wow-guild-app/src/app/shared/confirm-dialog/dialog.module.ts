import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateEventComponent } from '..//create-event/create-event.component';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [ConfirmationDialogComponent, CreateEventComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule
  ],
  exports: [ConfirmationDialogComponent, CreateEventComponent],
  entryComponents: [ConfirmationDialogComponent, CreateEventComponent],
  providers: [ConfirmationDialogService, CreateEventComponent]
})
export class DialogModule { }
