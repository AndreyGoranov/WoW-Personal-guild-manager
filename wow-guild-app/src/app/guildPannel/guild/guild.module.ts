import { GuildCalendar } from './../guild-calendar/guild-calendar.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { GuildTableComponent } from './../guild-table/guild-table.component';
import { GuildGalleryComponent } from './../guild-gallery/guild-gallery.component';
import { GuildAchivementsComponent } from './../guild-achivements/guild-achivements.component';
import { GuildComponent } from './guild.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

const routes: Routes = [{
  path: '', component: GuildComponent
}]


@NgModule({
  declarations: [
    GuildComponent,
    GuildAchivementsComponent,
    GuildGalleryComponent,
    GuildAchivementsComponent,
    GuildTableComponent,
    GuildCalendar
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  exports: [
    GuildCalendar
  ]
})
export class GuildModule { }
