import { Component, OnInit, Input, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Champion } from 'src/app/interfaces/champion-interface';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { SelectChampionService } from 'src/app/services/select-champion.service';
import { ConfirmationDialogService } from 'src/app/shared/confirm-dialog/confirmation-dialog.service';
import { racePictureSelect } from './../../utilities/constants/picture-selectors';
import * as firebase from "firebase/app";
import { trigger, state, style, transition, animate, useAnimation, animation, keyframes, AnimationTriggerMetadata } from '@angular/animations';

@Component({
  selector: 'app-champ',
  templateUrl: './champ.component.html',
  styleUrls: ['./champ.component.css'],
  animations: [
    trigger('dataChangeAnimation', [
      transition('* => *', [
        style({
          transform: 'translateY(-100%)',
          opacity: 1,
          backgroundColor: 'red',
        }),
        animate(1000, style({backgroundColor: 'black', transform: 'translateY(5%)', opacity: 1}))
      ])
    ])
      
  ]
})

export class ChampComponent implements OnChanges {

  constructor(private selectChampionService: SelectChampionService,
    public dataTransfer: DataTransferService,
    private router: Router,
    private dialogService: ConfirmationDialogService) { }
  
  @Input() selectedChampion: Champion;  
  racePictureSelector = racePictureSelect;
  previousChampion: Champion;
  latestChampion: Champion;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.selectedChampion);
    this.previousChampion = changes.selectedChampion.previousValue;
    this.selectedChampion = changes.selectedChampion.currentValue;
  }

  editChampion(id: string) {
    console.log(id, 'id kato cucknem edit');
    this.dataTransfer.editing = true;
    this.dataTransfer.champId = id;
    this.router.navigateByUrl('add-champion');
  }

  deleteChampion(id: string) {
    const options = {
      title: 'Delete Champion',
      message: 'Are you sure you want to delete this Champion ?',
      cancelText: 'Cancel',
      confirmText: 'Confirm'
    }
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (confirmed) {
        firebase.database().ref(`champions`).child(id).remove().catch(err => {
          console.log(err);
        });
        this.selectedChampion = this.previousChampion;
      }
    });
  }

  createGuild(id:string) {
    firebase.database().ref('champions').child(id).once('value').then(snap => {
      const currentGuildId = snap.val().guild;
      if (currentGuildId) {
        const options = {
          title: 'You already have a guild',
          message: 'Do you want to delete current guild and create new one ?',
          cancelText: 'Cancel',
          confirmText: 'Confirm'
        }
        this.dialogService.open(options);
        this.dialogService.confirmed().subscribe(confirm => {
          if (confirm) {
            firebase.database().ref('guilds').child(currentGuildId).remove().catch(err => {
              if (err) {
                alert('Whoops something went wrong deleting the guild. Please try again !');
              }
            });
            this.router.navigateByUrl('guild-profile');
          }
        });
      } else {
        this.dataTransfer.champId = id;
        this.router.navigateByUrl('guild-profile');
      }
    });
  }

  enterGuild(id: string) {
    this.dataTransfer.champId = id;
    this.router.navigateByUrl('enter-guild');
  }

}
