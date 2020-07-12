import { racePictureSelect } from './../../utilities/constants/picture-selectors';
import { Champion } from './../../interfaces/champion-interface';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from "firebase/app";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { }

  img: File = null;
  imgURL: any;
  message: string;
  email:string;
  racePictureSelector = racePictureSelect;

  dbRefObject;
  userId: string;
  userChampions: Array<Champion> = [];
  

  ngOnInit(): void {
    this.dbRefObject = firebase.database().ref('champions');
    this.userId = firebase.auth().currentUser.uid;
    this.dbRefObject.on('value', snap => this.getChampions(snap.val()));
  }

  async getChampions(data) {
    this.userChampions = [];
    const champions = data[this.userId];
    console.log(champions);
    for(let champ in champions) {
      let currentChampion: Champion  = champions[champ];
      this.userChampions.push(currentChampion);
      console.log(currentChampion);
    }
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
