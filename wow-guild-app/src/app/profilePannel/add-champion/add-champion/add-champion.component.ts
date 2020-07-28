import { Champion } from './../../../interfaces/champion-interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { specs } from '../../../utilities/constants/specs'
import { primaryProfessions, secondaryProfessions } from './../../../utilities/constants/professions';
import * as firebase from "firebase/app";

@Component({
  selector: 'app-add-champion',
  templateUrl: './add-champion.component.html',
  styleUrls: ['./add-champion.component.css']
})

export class AddChampionComponent implements OnInit {
  courses: any;
  
  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {}

  races: Array<string> = ['Human', 'Dwarf', 'Night elf', 'Orc', 'Undead', 'Tauren', 'Troll'];
  classes: Array<string> = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Druid'];
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
  // primaryProfsGroup: FormGroup;
  tests: AngularFireList<string>;
  itemToEdit: Champion;
  itemId: string;
  userId: string;
  addChampion: FormGroup;

  ngOnInit(): void {
    this.userId = firebase.auth().currentUser.uid;
    if (history.state.data) {
      this.itemId = history.state.data.id;
      console.log('from edit button');
      const itemToEditId = history.state.data.id;
      console.log('object to edit', itemToEditId);
      firebase.database().ref(`champions`).child(this.userId).child(itemToEditId).once('value').then(snap => 
          this.getChampionToEdit(snap.val()).then(champ =>  {this.addChampion = this.fb.group({
            name: [champ.name, [Validators.required]],
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
        name: ['', [Validators.required]],
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
    if (history.state.data) {
      firebase.database().ref(`champions`).child(this.userId).child(this.itemId).update(this.addChampion.value).catch(err => {
        console.log(err);
      });
    } else {
      this.db.list(`champions/${this.userId}`).push(this.addChampion.value).catch(err => {
        console.log(err);
      });
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

  classOptionDisable(currentClass) {
    const currentRace = this.addChampion.get('race').value;
    if (currentRace === 'Human') {
      switch(currentClass) {
        case 'Druid':
        case 'Shaman':
        case 'Hunter':
          return true;
        default:
          return false;
      }
    } else if (currentRace === 'Dwarf') {
      switch(currentClass) {
        case 'Druid':
        case 'Shaman':
        case 'Mage':
        case 'Warlock':
          return true;
        default:
          return false;
      }
    } else if (currentRace === 'Night elf') {
      switch(currentClass) {
        case 'Paladin':
        case 'Shaman':
        case 'Mage':
        case 'Warlock':
          return true;
        default:
          return false;
        }
      } else if (currentRace === "Gnome") {
        switch(currentClass) {
          case 'Druid':
          case 'Shaman':
          case 'Hunter':
          case 'Priest':
          case 'Paladin':
            return true;
          default:
            return false;
        }
      } else if (currentRace === "Orc") {
        switch(currentClass) {
          case 'Druid':
          case 'Priest':
          case 'Mage':
          case 'Paladin':
            return true;
          default:
            return false;
        }
      } else if (currentRace === "Undead") {
        switch(currentClass) {
          case 'Druid':
          case 'Shaman':
          case 'Hunter':
          case 'Paladin':
            return true;
          default:
            return false;
        }
      } else if (currentRace === "Tauren") {
        switch(currentClass) {
          case 'Priest':
          case 'Mage':
          case 'Warlock':
          case 'Paladin':
            return true;
          default:
            return false;
        }
      } else if (currentRace === "Troll") {
        switch(currentClass) {
          case 'Druid':
          case 'Paladin':
          case 'Warlock':
            return true;
          default:
            return false;
        }
      }
    }
}  

