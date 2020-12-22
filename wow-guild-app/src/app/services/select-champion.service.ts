import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Champion } from '../interfaces/champion-interface';


@Injectable({
  providedIn: 'root'
})
export class SelectChampionService {

  constructor() { }
  selectedChampion = new BehaviorSubject(null);
}
