import { relations } from './../../../utilities/constants/race-class-relations';
import { Champion } from './../../../interfaces/champion-interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { specs } from '../../../utilities/constants/specs'
import { primaryProfessions, secondaryProfessions } from './../../../utilities/constants/professions';
import * as firebase from "firebase/app";
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { nameVerification } from 'src/app/utilities/constants/nameRegex';
import { Router } from '@angular/router';
import { SelectChampionService } from 'src/app/services/select-champion.service';


@Component({
  selector: 'app-add-champion',
  templateUrl: './add-champion.component.html',
  styleUrls: ['./add-champion.component.css']
})

export class AddChampionComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private db: AngularFireDatabase,
    private dataTransfer: DataTransferService,
    public router: Router,
    private selectChampionService: SelectChampionService,
    ) { }
   
  relations = relations;
  races = Object.keys(relations);
  specs: object = specs; 
  primaryProfessions = primaryProfessions;
  secondaryProfessions = secondaryProfessions;
  primaryPanelOpenState = false;
  secondaryPanelOpenState = false;
  checkedPrimaryProfessions = {};
  checkedSecondaryProfessions = {};
  professionCounter = 0;
  itemToEdit: Champion;
  champId: string;
  userId: string;
  addChampion: FormGroup;
  shouldEdit = false;
  latestChamp: Champion;
  editedChamp: Champion;

  ngOnInit(): void { 
    this.userId = firebase.auth().currentUser.uid;
    if (this.dataTransfer.editing) {
      this.shouldEdit = true;
      this.dataTransfer.editing = false;
      this.champId = this.dataTransfer.champId;
      this.dataTransfer.champId = '';
      console.log('champId ot service', this.champId);
      firebase.database().ref(`champions`).child(this.champId).once('value').then(snap => 
          this.getChampionToEdit(snap.val()).then(champ =>  {this.addChampion = this.fb.group({
            name: [champ.name, [Validators.required, Validators.minLength(2), Validators.maxLength(12), Validators.pattern(nameVerification)]],
            race: [champ.race, [Validators.required]],
            champClass: [champ.champClass, [Validators.required]],
            spec: [champ.spec, [Validators.required]],
            level: [champ.level, [Validators.required, Validators.min(1), Validators.max(60)]],
            gender: [champ.gender , [Validators.required]],
            primaryProfs: this.fb.group(champ.primaryProfs || {}),
            secondaryProfs: this.fb.group(champ.secondaryProfs || {}),
            //TODO Add honor / kills  and rank
            // ADD Fraction ICON on Champs 
            // Just came to mind  can make Guild Achivements section =]
            // Add guild competitions in raids  for time and bosses killed and rankings
            // Maby add guild relations in the app like  shared data or sth with other guilds trough additional pannel
          })
          for (let prof in champ.primaryProfs) {
            this.professionCounter++;
            this.checkedPrimaryProfessions[prof] = 'checked';
            this.primaryProfs.get(prof).setValidators(Validators.max(300));
          }
          for (let prof in champ.secondaryProfs) {
            this.checkedSecondaryProfessions[prof] = 'checked';
            this.secondaryProfs.get(prof).setValidators(Validators.max(300));
          }
        }) 
      )    
    } else {
      this.addChampion = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(12), Validators.pattern(nameVerification)]],
        race: ['', [Validators.required]],
        champClass: ['', [Validators.required]],
        spec: ['', [Validators.required]],
        level: ['1', [Validators.required, Validators.min(1), Validators.max(60)]],
        gender: ['', [Validators.required]],
        primaryProfs: this.fb.group({}),
        secondaryProfs: this.fb.group({}),
        //TODO Add honor / kills  and rank
        // ADD Fraction ICON on Champs 
        // Just came to mind  can make Guild Achivements section =]
        // Add main role   dps / heal /tank
        // maby add like additional pannel for showing Champs of different roles  like picutre with info 
        // add voting system to navbar
      })
    }
    
  }

  handleChampion() {
    let succesfullOperation = true;
    if (this.shouldEdit) {
      const champData: Champion = this.addChampion.value;
      champData.name = champData.name[0].toUpperCase() + champData.name.slice(1).toLowerCase();
      champData.role = this.roleDetermination(this.addChampion.get('spec').value);
      champData.id = this.champId;
      this.editedChamp = champData;
      firebase.database().ref(`champions`).child(this.champId).update(champData).catch(err => {
        if(err) {
          succesfullOperation = false;
        }
        console.log(err);
      });
    } else {
      const champData: Champion = this.addChampion.value;
      champData.name = champData.name[0].toUpperCase() + champData.name.slice(1).toLowerCase();
      champData['userId'] = this.userId;
      champData.role = this.roleDetermination(this.addChampion.get('spec').value);
      this.latestChamp = champData;
      this.db.list('champions').push(champData).catch(err => {
        if (err) {
          alert(err);
        }
      });
    }
    if (succesfullOperation) {
      if (this.shouldEdit) {
        sessionStorage.setItem('justEdited', 'yes');
        sessionStorage.setItem('editedChampion', JSON.stringify(this.editedChamp));
      } else {
        sessionStorage.setItem('isNew', 'yes');
      }
      this.router.navigateByUrl('entrance');
    } else {
      alert('Something went wrong. Plese try again !');
    }
  
  }

  async getChampionToEdit(data) {
    console.log('in async', data);
    return this.itemToEdit = data;
  }

  getNewChampInfo(info: Champion) {
    return info
  }


  get name() {
    return this.addChampion.get('name');
  }

  get race() {
    return this.addChampion.get('race');
  }

  get champClass() {
    return this.addChampion.get('champClass');
  }

  get primaryProfs() {
    return this.addChampion.get('primaryProfs');
  }

  get secondaryProfs() {
    return this.addChampion.get('secondaryProfs');
  }

  get gender() {
    return this.addChampion.get('gender');
  }

  getSelectedGender(gender) {
    this.addChampion.get('gender').patchValue(gender);
  }

  getSelectedSpec(spec: string) {
    this.addChampion.get('spec').patchValue(spec);
  }

  getSelectedProfessions(event, name, professionsArray) { 
    if (professionsArray === 'primary') {
      if (event.checked) {
        this.professionCounter++;
        this.checkedPrimaryProfessions[name] = 'checked';
        (this.addChampion.get('primaryProfs') as FormGroup).addControl(name, this.fb.control('',Validators.max(300)));
      } else {
        this.professionCounter--;
        this.checkedPrimaryProfessions[name] = false;
        (this.addChampion.get('primaryProfs') as FormGroup).removeControl(name);
      }
    } else if (professionsArray === 'secondary') {
      if (event.checked) {
        this.checkedSecondaryProfessions[name] = 'checked';
        (this.addChampion.get('secondaryProfs') as FormGroup).addControl(name, this.fb.control('',Validators.max(300)));
      } else {
        this.checkedSecondaryProfessions[name] = '';
        (this.addChampion.get('secondaryProfs') as FormGroup).removeControl(name);
      }
    }
  }

  classSelectDisable() {
    return this.addChampion.get('race').hasError('required')
  }

  roleDetermination(spec: string) {
    let role: string;
    if (spec === 'Restoration' || spec === "Holy") {
      role = 'Heal'
    } else if (spec === 'Protection') {
      role = 'Tank'
    } else {
      role = 'Dps'
    }
    return role
  }

  cancelOperation() {
    this.router.navigateByUrl('entrance');
  }

}  

