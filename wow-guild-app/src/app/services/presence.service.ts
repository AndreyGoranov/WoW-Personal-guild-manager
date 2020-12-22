import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from "firebase/app";
import { first, switchMap, map, tap } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { 
    this.updateOnUser().subscribe();
    this.updateOnDisconnect().subscribe();
  }

  getPresence(uId: string): void {
    this.db.object(`status/${uId}`).valueChanges();
  }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async setPresence(status: string) {
    const user = await this.getUser();
    if (user) { 
      return this.db.object(`status/${user.uid}`).update({status, timestamp: this.timestamp});
    }
  }

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  updateOnUser() {
    const connection = this.db.object('.info/connected').valueChanges().pipe(map(connected => connected ? 'online' : 'offline'));
    return this.afAuth.authState.pipe(
      switchMap(user => user ? connection : of('offline')),
      tap(status => this.setPresence(status))
    );
  }

  updateOnAway(): void {
    document.onvisibilitychange = (e) => {
      if (document.visibilityState === 'hidden') {
        this.setPresence('away');
      } else {
        this.setPresence('online');
      }
    }
  }

  updateOnDisconnect() {
    return this.afAuth.authState.pipe(
      tap(user => {
        if (user) {
          this.db.object(`status/${user.uid}`).query.ref.onDisconnect().update({
            status: 'offline',
            timestamp: this.timestamp
          });
        }
      })
    )
  }

}
