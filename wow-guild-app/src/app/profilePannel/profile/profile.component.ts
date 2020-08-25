import { DataTransferService } from './../../services/data-transfer.service';
import { Router } from '@angular/router';
import { racePictureSelect } from './../../utilities/constants/picture-selectors';
import { Champion } from './../../interfaces/champion-interface';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from "firebase/app";
import { ConfirmationDialogService } from 'src/app/shared/confirm-dialog/confirmation-dialog.service';

// Create guild acc / pass / name / fraction / 
// When enter should have empty calendar // empty table // Navbar // Empty achivments or mby trough nav // 
// and only guild creator/master can see and add to char list  which will determin if champs can enter + acc & pw verification

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  constructor(private dataTransfer: DataTransferService, public router: Router, private dialogService: ConfirmationDialogService) { }

  img: File = null;
  imgURL: any;
  message: string;
  email:string;
  racePictureSelector = racePictureSelect;

  dbRefObject;
  userId: string;
  userChampions: Array<Champion> = [];
  userChampz;
  

  ngOnInit(): void {
    this.userId = firebase.auth().currentUser.uid;
    firebase.database().ref('champions').orderByChild('userId').equalTo(this.userId).on('value', snap => this.getChampions(snap.val()));
  }

  async getChampions(data) {
    console.log(data);
    this.userChampions = [];
    for(let champ in data) {
      console.log('tursim id pri get',champ);
      let currentChampion: Champion = data[champ];
      currentChampion.id = champ;
      console.log(currentChampion);
      this.userChampions.push(currentChampion);
      console.log(currentChampion);
    }
    console.log(this.userChampions)
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
        })
      }
    })
  }

  enterGuild(id:string, name: string) {
    console.log('id v profile predi enter guild', id);
    this.dataTransfer.champId = id;
    this.dataTransfer.champName = name;
    this.router.navigateByUrl('enter-guild');
  }

  createGuild(id:string) {
    this.dataTransfer.champId = id;
    this.router.navigateByUrl('guild-profile');
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
