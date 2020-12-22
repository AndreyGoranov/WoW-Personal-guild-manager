import { Component } from '@angular/core';
import { DataTransferService } from './services/data-transfer.service';
import { SelectChampionService } from './services/select-champion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor() {}
  title = 'wow-guild-app';
}
