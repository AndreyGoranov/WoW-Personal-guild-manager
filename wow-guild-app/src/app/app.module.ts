import { GuildModule } from './guildPannel/guild/guild.module';
import { ConfirmDialogModule } from './shared/confirm-dialog/confirm-dialog.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './authentication/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profilePannel/profile/profile.component';
import { EntranceSceneComponent } from './entrance/entrance-scene/entrance-scene.component';
import { AddChampionComponent } from './profilePannel/add-champion/add-champion/add-champion.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireAuthModule } from '@angular/fire/auth'
import * as firebase from "firebase/app";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { CreateGuildComponent } from './profilePannel/create-guild/create-guild.component';
import { EnterGuildComponent } from './profilePannel/enter-guild/enter-guild.component';


firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    EntranceSceneComponent,
    AddChampionComponent,
    CreateGuildComponent,
    EnterGuildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    AngularFireModule.initializeApp(environment.firebase, 'wow-guild-manager'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    MatGridListModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule,
    ConfirmDialogModule,
    GuildModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
