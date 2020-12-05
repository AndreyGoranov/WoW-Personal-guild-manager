import { EventComponent } from './../event-component/event/event.component';
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
import { SlideMenuModule } from 'primeng/slidemenu';

@NgModule({
  declarations: [ConfirmationDialogComponent, CreateEventComponent, EventComponent],
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
    MatRadioModule,
    SlideMenuModule,
  ],
  exports: [ConfirmationDialogComponent, CreateEventComponent, EventComponent],
  entryComponents: [ConfirmationDialogComponent, CreateEventComponent],
  providers: [ConfirmationDialogService, CreateEventComponent]
})
export class DialogModule { }
