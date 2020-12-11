import { relations } from './../../../utilities/constants/race-class-relations';
import { Champion } from './../../../interfaces/champion-interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  courses: any;
  
  constructor(private fb: FormBuilder,
    private db: AngularFireDatabase,
    private dataTransfer: DataTransferService,
    public router: Router,
    private selectChampionService: SelectChampionService,
    private renderer: Renderer2) { }

  relations = relations;
  races = Object.keys(relations);
  specs: object = specs; 
  checkedSpec = {};
  male = true;
  female = false;
  primaryProfessions = primaryProfessions;
  secondaryProfessions = secondaryProfessions;
  primaryPanelOpenState = false;
  secondaryPanelOpenState = false;
  checkedPrimaryProfessions = {};
  checkedSecondaryProfessions = {};
  professionCounter = 0;
  tests: AngularFireList<string>;
  itemToEdit: Champion;
  champId: string;
  userId: string;
  addChampion: FormGroup;

  ngOnInit(): void {
    this.userId = firebase.auth().currentUser.uid;
    if (this.dataTransfer.champId) {
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

    }

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

  handleChampion() {
    let currentChamp: Champion;
    let succesfullOperation = true;
    if (this.champId) {
      const champData: Champion = this.addChampion.value;
      champData.role = this.roleDetermination(this.addChampion.get('spec').value);
      firebase.database().ref(`champions`).child(this.champId).update(champData).catch(err => {
        if(err) {
          succesfullOperation = false;
        }
        console.log(err);
      });
      currentChamp = champData;
      this.champId = '';
    } else {
      const champData: Champion = this.addChampion.value;
      champData['userId'] = this.userId;
      champData.role = this.roleDetermination(this.addChampion.get('spec').value);
      this.db.list('champions').push(champData).catch(err => {
        if(err) {
          succesfullOperation = false;
        }
        console.log(err);
      });
      currentChamp = champData;
    }
    if (succesfullOperation) {
      this.selectChampionService.selectedChampion.next(currentChamp);
      this.router.navigateByUrl('entrance');
    } else {
      alert('Something went wrong :( Plese try again and excuse us for the trouble :)');
    }
    
  }

  async getChampionToEdit(data) {
    console.log('in async', data);
    return this.itemToEdit = data;
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

  getSelectedSpec(event, name, champClass) {
    console.log(event.checked);
    if (event.checked) {
      this.specs[champClass.toLowerCase()].forEach(element => {
        if (name !== element) {
          this.checkedSpec[element] = true;
        } else {
          this.checkedSpec[element] = false;
          this.addChampion.get('spec').patchValue(name);
          console.log(this.addChampion.get('spec').value);
        }
      });
    } else {
      this.addChampion.get('spec').patchValue('');
      console.log(this.addChampion.get('spec').value);
      this.specs[champClass.toLowerCase()].forEach(element => {
        this.checkedSpec[element] = false;
      })
    }

    console.log(this.checkedSpec)
  }

  getSelectedProfessions(event, name, professionsArray) {
    if (professionsArray === 'primary') {
      if (event.checked) {
        this.professionCounter++;
        this.checkedPrimaryProfessions[name] = 'checked'; 
        (this.addChampion.get('primaryProfs') as FormGroup).addControl(name, this.fb.control('',Validators.max(300)));
        // this.primaryProfsGroup = (this.addChampion.get('primaryProfs') as FormGroup);
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
    
    console.log(this.professionCounter)
    console.log(this.addChampion);
    console.log(this.checkedPrimaryProfessions);
    console.log(this.checkedSecondaryProfessions);
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

}  

