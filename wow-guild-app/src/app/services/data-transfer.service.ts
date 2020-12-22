import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  champId: string;
  guildId: string;
  champName: string;
  champRace: string;
  editing = false;
  latestChamp = null;

}
