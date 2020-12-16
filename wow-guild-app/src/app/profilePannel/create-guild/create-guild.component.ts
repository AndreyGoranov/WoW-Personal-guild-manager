import { DataTransferService } from 'src/app/services/data-transfer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from "firebase/app";
import { detectFraction } from 'src/app/utilities/constants/fraction-detect';
import { nameVerification } from 'src/app/utilities/constants/nameRegex';


@Component({
  selector: 'app-create-guild',
  templateUrl: './create-guild.component.html',
  styleUrls: ['./create-guild.component.css']
})
export class CreateGuildComponent implements OnInit {

  constructor(private fb: FormBuilder, private dataTransfer: DataTransferService) { }

  addGuild: FormGroup;
  guildCreatorId: string;
  guildInfo = <any>{};
  userId: string;

  ngOnInit(): void {
    this.guildCreatorId = this.dataTransfer.champId;
    this.dataTransfer.champId = '';
    this.userId = firebase.auth().currentUser.uid;
    console.log(history.state);
    console.log(this.guildCreatorId);
    this.addGuild = this.fb.group({
      guildName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(24), Validators.pattern(nameVerification)]],
      guildAcc: ['', [Validators.required, Validators.maxLength(50)]],
      guildPass: ['', [Validators.required, Validators.maxLength(50)]]
    });
  } 

  setFraction(name: string) {
    this.addGuild.get('guildFraction').patchValue(name);
  }

  createGuildInfo() {
    let name: string;
    this.guildInfo = this.addGuild.value;
    this.guildInfo.fraction = detectFraction(this.dataTransfer.champRace);
    this.guildInfo.members = {};
    this.guildInfo.members[this.guildCreatorId] = "GuildMaster";
    firebase.database().ref('guilds').push(this.guildInfo).once('value', snap => {
      name = snap.key;
      console.log(name);  
    }).catch(err => {
      console.log(err);
    });
    let guild = {'guild' : name}
    firebase.database().ref('champions').child(this.guildCreatorId).update(guild);
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

}
