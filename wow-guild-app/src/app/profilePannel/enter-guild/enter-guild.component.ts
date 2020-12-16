import { DataTransferService } from './../../services/data-transfer.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-enter-guild',
  templateUrl: './enter-guild.component.html',
  styleUrls: ['./enter-guild.component.css']
})
export class EnterGuildComponent implements OnInit {

  constructor(private fb: FormBuilder, private db: AngularFireDatabase, private router: Router, private dataService: DataTransferService) { }

  enterGuild: FormGroup;
  enteringChampId: string;
  userId: string;
  guildId: string;
  guildFraction: string;

  ngOnInit(): void {
    this.enteringChampId = this.dataService.champId;
    console.log(this.enteringChampId, 'enter id ot serice');
    this.userId = firebase.auth().currentUser.uid;
    // checking if already has a guild enter directly
    firebase.database().ref('champions').child(this.enteringChampId).child('guild').once('value', snap => {
      let guildId: string = snap.val();
      console.log(guildId);this.setGuildId(guildId);
      if (guildId) {
        this.setGuildId(guildId);
        return this.router.navigate(['guild/g',{ outlets: { "guild": [ "table"] } }]);
      }
    });
    this.enterGuild = this.fb.group({
      guildAcc: ['', [Validators.required]],
      guildPass: ['', [Validators.required]]
    })
  }
  
  get guildAcc() {
    return this.enterGuild.get('guildAcc');
  }
  get guildPass() {
    return this.enterGuild.get('guildPass');
  }

  setGuildId(id:string) {
    this.dataService.guildId = id;
  }

  handleAuthentication() {
    const acc = this.enterGuild.get('guildAcc').value;
    const pass = this.enterGuild.get('guildPass').value;
    let passToMatch: string;
    firebase.database().ref('guilds').orderByChild('guildAcc').equalTo(acc).once('value', data => {
      console.log('equalToAcc:',data);
      console.log('eq',data.key);
      console.log('eq',data.val());
      if (data.val()) {
        data.forEach(snap => {
          passToMatch = snap.val().guildPass;
        })
        console.log('passToMatch:', passToMatch);
        console.log('pass', pass);
        if (passToMatch === pass) {
          data.forEach(snap => {
            this.guildId = snap.key;
            let guild = {'guild': this.guildId}
            let champStatus = {};
            champStatus[this.enteringChampId] = 'member'
            firebase.database().ref('guilds').child(this.guildId).child('members').update(champStatus);
            firebase.database().ref('champions').child(this.enteringChampId).update(guild);                                                                                                                                 
            console.log(this.guildId, 'key');
            this.setGuildId(this.guildId);
          });
          this.router.navigate(['guild/g',{ outlets: { "guild": [ "table"] } }]);
        }
      }
    });
    // TODO ADD CHECK ON INIT IF EXIST ENTER WITHOUT CREDENTIALS
    // console.log(guildCredentials);
    console.log(acc);
  }

}
