import { DataTransferService } from './../../services/data-transfer.service';
import { Router } from '@angular/router';
import { racePictureSelect } from './../../utilities/constants/picture-selectors';
import { Champion } from './../../interfaces/champion-interface';
import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/app";
import { ConfirmationDialogService } from 'src/app/shared/confirm-dialog/confirmation-dialog.service';
import { SelectChampionService } from 'src/app/services/select-champion.service';

// Create guild acc / pass / name / fraction / 
// When enter should have empty calendar // empty table // Navbar // Empty achivments or mby trough nav // 
// and only guild creator/master can see and add to char list  which will determin if champs can enter + acc & pw verification

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  constructor(private dataTransfer: DataTransferService,
    public router: Router,
    private dialogService: ConfirmationDialogService,
    private selectChampionService: SelectChampionService) { }

  img: File = null;
  imgURL: any;
  message: string;
  email:string;
  racePictureSelector = racePictureSelect;
  dbRefObject;
  userId: string;
  userChampions: Array<Champion> = [];
  initialChampion: Champion;
  
// fix when created new champ to be selected  only  first login always start with first champ (rxjs i guess ^^ :D)
  ngOnInit(): void {
    this.userId = firebase.auth().currentUser.uid;
    firebase.database().ref('champions').orderByChild('userId').equalTo(this.userId).on('value', snap => this.getChampions(snap.val()).catch(err => {
      console.log(err);
    }));
  }

  async getChampions(data) {
    let first = true;
    this.userChampions = [];
    for(let id in data) {
      if (first) {
        this.initialChampion = data[id];
        first = false;
      }
      let currentChampion: Champion = data[id];
      currentChampion.id = id;
      this.userChampions.push(currentChampion);
    }
  }

  selectChampion(champ: Champion) {
    this.selectChampionService.selectedChampion.next(champ);
  }

  onFileSelected(event) {
    this.img = event.target.files[0];
    this.preview(this.img);
    // Upload to database
  }

  preview(img: File) {
    if (!img) {
       return;
    }
     
    let mimeType = img.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(img); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
    }
  }

}
