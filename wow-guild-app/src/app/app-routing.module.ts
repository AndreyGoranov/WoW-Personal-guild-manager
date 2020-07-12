import { AddChampionComponent } from './profilePannel/add-champion/add-champion/add-champion.component';
import { EntranceSceneComponent } from './entrance/entrance-scene/entrance-scene.component';
import { LoginComponent } from './authentication/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'entrance', component: EntranceSceneComponent},
  {path: 'add-champion', component: AddChampionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
