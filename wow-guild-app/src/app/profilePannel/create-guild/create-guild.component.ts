import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css']
})
export class CreateGuildComponent implements OnInit {

  constructor(private fb: FormBuilder, private db: AngularFireDatabase) { }

  addGuild: FormGroup;
  guildCreatorId: string;
  guildInfo = <any>{};
  userId: string;

  ngOnInit(): void {
    this.guildCreatorId = history.state.data;
    this.userId = firebase.auth().currentUser.uid;
    console.log(history.state);
    console.log(this.guildCreatorId);
    this.addGuild = this.fb.group({
      guildName: ['', [Validators.required]],
      guildAcc: ['', [Validators.required]],
      guildPass: ['', [Validators.required]],
      guildFraction: ['', [Validators.required]],
    })
  } 

  setFraction(name: string) {
    this.addGuild.get('guildFraction').patchValue(name);
  }

  createGuildInfo() {
    let name: string;
    this.guildInfo = this.addGuild.value;
    this.guildInfo.members = {};
    this.guildInfo.members[this.guildCreatorId] = "GuildMaster";
    let currGuild = firebase.database().ref('guilds').push(this.guildInfo).once('value', snap => {
      name = snap.key;
      console.log(name);
    }).catch(err => {
      console.log(err);
    });
    let guild = {'guild' : name}
    firebase.database().ref('champions').child(this.userId).child(this.guildCreatorId).update(guild)
  }

  get guildName() {
    return this.addGuild.get('guildName');
  }
  get guildAcc() {
    return this.addGuild.get('guildName');
  }
  get guildPass() {
    return this.addGuild.get('guildPass');
  }
  get guildFraction() {
    return this.addGuild.get('guildFraction');
  }

}
