import { DataTransferService } from './../../services/data-transfer.service';
import { PresenceService } from './../../services/presence.service';
import { Champion } from './../../interfaces/champion-interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-guild-table',
  templateUrl: './guild-table.component.html',
  styleUrls: ['./guild-table.component.scss']
})
export class GuildTableComponent implements OnInit {
  

  champions: Array<Champion> = [];

  selectedChampions: Champion[];

  allChampsSelected = false;

  userChampName: string;

  statuses: any[];

  loading: boolean = true;

  userId: string;
  @ViewChild('dt') table: Table;

  constructor(private dataService: DataTransferService, private presence: PresenceService) { }

  ngOnInit() {
    this.userId = firebase.auth().currentUser.uid;
    this.userChampName = this.dataService.champName;
    const guildId: string = this.dataService.guildId;
    firebase.database().ref('champions').orderByChild('guild').equalTo(guildId).on('value', snapshot => {
        console.log(snapshot.val());
        let champs = snapshot.val();
        for (let champ in champs) {
            champs[champ].status = this.presence.getPresence(champs[champ].userId);
            console.log(champs[champ], 'predi push');
            this.champions.push(champs[champ]);
        }
      })
      this.loading = false;   
     
  }

  selectAllChamps(e) {
    console.log('select all clicked', e);
    if (e) {
      this.allChampsSelected = true;
    } else {
      this.allChampsSelected = false;
    }
  }
  selectedChamp(champName, e) {
    if (e.checked) {
      console.log(this.selectedChampions);
      document.getElementById(champName).className = 'selectedChamp'
    } else {
      if (this.userChampName === champName) {
        document.getElementById(champName).className = 'userChamp';
      } else {
        document.getElementById(champName).className = 'dynamic';
      }
      
    }
  }

  onActivityChange(event) {
      const value = event.target.value;
      if (value && value.trim().length) {
          const activity = parseInt(value);

          if (!isNaN(activity)) {
              this.table.filter(activity, 'activity', 'gte');
          }
      }
  }

}
