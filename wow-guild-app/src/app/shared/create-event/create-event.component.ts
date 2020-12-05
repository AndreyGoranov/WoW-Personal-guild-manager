import { DataTransferService } from 'src/app/services/data-transfer.service';
import { championClasses, championRoles } from './../../utilities/constants/champion-classes';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { dungeons } from '../../utilities/constants/dungeon-raids-json';
import * as firebase from "firebase/app";

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
      title: string,
      getData
    }, 
    private mdRef: MatDialogRef<CreateEventComponent>,
    private fb: FormBuilder,
    private dataTransfer: DataTransferService
) { }
    
    dungeons: object;
    dungeonNames: string[];
    addEvent: FormGroup;
    dungeonName: string;
    selectedDungeon: object // add interface;
    showClassLimits = false;
    showRoleLimits = false;
    classes: string[];
    roles: string[];

  ngOnInit(): void {
      this.classes = Object.keys(championClasses);
      this.roles = Object.keys(championRoles);
      dungeons().then(dungJson => {
      console.log(dungJson);
      this.dungeonNames = Object.keys(dungJson);
      this.dungeons = dungJson;
      console.log(this.dungeons);
    });
    
    this.addEvent = this.fb.group({
      eventType: ['', Validators.required],
      selectedEvent: ['', Validators.required],
      startingTime: ['', Validators.required],
      meetingPoint: ['', Validators.required],
      classLimits: this.fb.group(championClasses),
      roleLimits: this.fb.group(championRoles)
    })

  }

  get selectedEvent() {
    return this.addEvent.get('selectedEvent');
  }

  get startingTime() {
    return this.addEvent.get('startingTime');
  }

  get meetingPoint() {
    return this.addEvent.get('meetingPoint');
  }

  public cancel() {
      this.close(false);
  }
  public close(value) {
      this.mdRef.close(value);
  }
  public confirm() {
    const guildId = this.dataTransfer.guildId;
    console.log('gID ot conirm na modala v eventa', guildId);
      firebase.database().ref('guilds').child(guildId).child('events').push(this.addEvent.value).catch(err => { 
        console.log(err);
      });
      if (this.addEvent.valid) {
        this.close(true);
      }
      
  }
  @HostListener("keydown.esc") 
    public onEsc() {
      this.close(false);
  }

  getSelectedEventType(eventType: string) {
    console.log('asadasdasdd')
    this.addEvent.get('eventType').patchValue(eventType);
    console.log(this.addEvent.get('eventType').value);
  }

  handleDungeonSelect(dungeonName: string) {
    this.dungeonName = dungeonName;
    this.selectedDungeon = this.dungeons[dungeonName];
    console.log('selected dung', this.selectedDungeon);
  }
  
  handleLimitationMenus(tab) {
    if (tab === 'class') {
      this.showClassLimits = true;
      this.showRoleLimits = !this.showClassLimits;
    } else {
      this.showRoleLimits = true;
      this.showClassLimits = !this.showRoleLimits;
    }
  }

}
