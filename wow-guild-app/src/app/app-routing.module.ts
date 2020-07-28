import { EnterGuildComponent } from './profilePannel/enter-guild/enter-guild.component';
import { CreateGuildComponent } from './profilePannel/create-guild/create-guild.component';
import { AddChampionComponent } from './profilePannel/add-champion/add-champion/add-champion.component';
import { EntranceSceneComponent } from './entrance/entrance-scene/entrance-scene.component';
import { LoginComponent } from './authentication/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'entrance', component: EntranceSceneComponent},
  {path: 'add-champion', component: AddChampionComponent},
  {path: 'guild-profile', component: CreateGuildComponent},
  {path: 'enter-guild', component: EnterGuildComponent},
  {path: 'guild', loadChildren: () => import ('./guildPannel/guild/guild.module').then(m => m.GuildModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
