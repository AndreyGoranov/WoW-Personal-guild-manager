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

  constructor(private fb: FormBuilder, private db: AngularFireDatabase, private router: Router) { }

  enterGuild: FormGroup;
  enteringChampId: string;
  userId: string;

  ngOnInit(): void {
    this.enteringChampId = history.state.data;
    this.userId = firebase.auth().currentUser.uid;
    firebase.database().ref('champions').child(this.userId).child(this.enteringChampId).child('guild').once('value', snap => {
      let guildId: string = snap.val();
      console.log(guildId);
      if (guildId) {
        return this.router.navigate(['guild'], {state: {data: guildId}});
      }
    })
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
            let guildKey = snap.key
            let guild = {'guild': guildKey}
            let champStatus = {};
            champStatus[this.enteringChampId] = 'member'
            firebase.database().ref('guilds').child(guildKey).child('members').update(champStatus);
            firebase.database().ref('champions').child(this.userId).child(this.enteringChampId).update(guild);                                                                                                                                 
            console.log(guildKey, 'key');
          });
           this.router.navigateByUrl('guild');
        }
      }
    });
    // TODO ADD CHECK ON INIT IF EXIST ENTER WITHOUT CREDENTIALS
    // console.log(guildCredentials);
    console.log(acc);
  }

}
