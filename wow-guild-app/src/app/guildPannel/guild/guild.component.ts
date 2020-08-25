import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css']
})
export class GuildComponent implements OnInit {

  constructor() { }

  guildId: string;

  ngOnInit(): void {
    if (history.state.data) {
      this.guildId = history.state.data
      firebase.database().ref('champions').orderByChild('guild').equalTo(this.guildId).on('value', snapshot => {
        console.log(snapshot.val())
      })
    
    }
  }
}
