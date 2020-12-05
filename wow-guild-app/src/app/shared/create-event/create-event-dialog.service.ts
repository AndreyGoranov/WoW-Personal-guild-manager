import { CreateEventComponent } from './create-event.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateEventDialogService {

  constructor(private dialog: MatDialog) { }

  dialogRef: MatDialogRef<CreateEventComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(CreateEventComponent, {    
         data: {
           title: options.title,
           message: options.message,
           cancelText: options.cancelText,
           confirmText: options.confirmText
         },
         height: '450px',
         width: '900px'
    });
  }
  public confirmed(): Observable<any> {
    
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
        console.log(res);
        return res;
      }
    ));
  }
}
