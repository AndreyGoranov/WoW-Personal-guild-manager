import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    cancelText: string,
    confirmText: string,
    message: string,
    title: string
}, private mdRef: MatDialogRef<ConfirmationDialogComponent>) { }

  ngOnInit(): void {
  }

  public cancel() {
      this.close(false);
  }
  public close(value) {
      this.mdRef.close(value);
  }
  public confirm() {
      this.close(true);
  }
  @HostListener("keydown.esc") 
    public onEsc() {
      this.close(false);
  }
  
}
