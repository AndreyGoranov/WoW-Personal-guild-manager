import { DialogModule } from './shared/confirm-dialog/dialog.module';
import { GuildCalendar } from './guildPannel/guild-calendar/guild-calendar.component';
import { GuildModule } from './guildPannel/guild/guild.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ChampComponent } from './profilePannel/champ/champ.component';
import { FocusDirective } from './directives/focus.directive';
import { DataTransferService } from './services/data-transfer.service';
import { SelectChampionService } from './services/select-champion.service';
import { RouterModule } from '@angular/router';

firebase.initializeApp(environment.firebase);
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    EntranceSceneComponent,
    AddChampionComponent,
    CreateGuildComponent,
    EnterGuildComponent,
    GuildCalendar,
    ChampComponent,
    FocusDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatExpansionModule,
    FlatpickrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase, 'wow-guild-manager'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    MatGridListModule,
    MatRadioModule,
    MatIconModule,
    MatMenuModule,
    DialogModule,
    GuildModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    
  ],
  exports: [GuildCalendar],
  providers: [DataTransferService, SelectChampionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
