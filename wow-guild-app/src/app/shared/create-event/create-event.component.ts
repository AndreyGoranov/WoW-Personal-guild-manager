import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      cancelText: string,
      confirmText: string,
      message: string,
      title: string
    }, 
    private mdRef: MatDialogRef<CreateEventComponent>,
    private fb: FormBuilder
) { }
  
    addEvent: FormGroup;

  ngOnInit(): void {
    this.addEvent = this.fb.group({
      eventType: ['', Validators.required],
      selectedEvent: ['', Validators.required]
    })
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

  getSelectedEventType(eventType: string) {
    this.addEvent.get('eventType').patchValue(eventType);
  }

  




}
