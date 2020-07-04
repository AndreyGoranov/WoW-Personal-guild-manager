import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-champion',
  templateUrl: './add-champion.component.html',
  styleUrls: ['./add-champion.component.css']
})

export class AddChampionComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  races: Array<string> = ['Human', 'Dwarf', 'Night elf', 'Orc', 'Undead', 'Tauren', 'Troll'];
  classes: Array<string> = ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock'];

  addChampion: FormGroup;

  ngOnInit(): void {
    this.addChampion = this.fb.group({
      name: ['', [Validators.required]],
      race: ['', [Validators.required]],
      champClass:['', [Validators.required]],

    })
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

}
