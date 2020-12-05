import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  constructor() { }
  @Input() dungeonName: string;
  @Input() dungeon: object; // add interface
  bosses: string[];
  currentItems: any [];

  ngOnInit(): void { 
    console.log('event inited');
    console.log(this.dungeonName);
    console.log(this.dungeon);
    this.bosses = Object.keys(this.dungeon);
  }

  showItems(boss) {
    this.currentItems = Object.keys(this.dungeon[boss]);
    console.log(this.currentItems);
  }

}
