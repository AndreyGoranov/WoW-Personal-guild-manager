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

export class ChampComponent implements OnInit {

  constructor(private selectChampionService: SelectChampionService,
    public dataTransfer: DataTransferService,
    private router: Router,
    private dialogService: ConfirmationDialogService) { }

  @Input() initialChampion: Champion;  
  racePictureSelector = racePictureSelect;
  selectedChampion: Champion;

  ngOnInit(): void {
    console.log(this.initialChampion, 'init champ');
    this.selectChampionService.selectedChampion.subscribe(champ => {
      console.log(champ, 'in champ component')
      if (champ) {
        this.selectedChampion = champ;
      } else {
        this.selectedChampion = this.initialChampion;
      }
    })
  }

  editChampion(id: string) {
    console.log('id v edit predi rout', id);
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
        this.selectChampionService.selectedChampion.next(this.initialChampion);
      }
    });
  }

  enterGuild(id:string, name: string) {
    console.log('id v profile predi enter guild', id);
    this.dataTransfer.champId = id;
    this.dataTransfer.champName = name;
    this.router.navigateByUrl('enter-guild');
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

}
