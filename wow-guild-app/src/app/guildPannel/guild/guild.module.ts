import { FullCalendarModule } from 'primeng/fullcalendar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { GuildNavComponent } from './../guild-nav/guild-nav.component';
import { GuildCalendar } from './../guild-calendar/guild-calendar.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { GuildTableComponent } from './../guild-table/guild-table.component';
import { GuildGalleryComponent } from './../guild-gallery/guild-gallery.component';
import { GuildAchivementsComponent } from './../guild-achivements/guild-achivements.component';
import { GuildComponent } from './guild.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DialogModule } from 'src/app/shared/confirm-dialog/dialog.module';

const routes: Routes = [
  { path: 'g', component: GuildComponent, children: [
    { path: 'calendar', component: GuildCalendar, outlet: 'guild' },
    { path: 'achivements', component: GuildAchivementsComponent, outlet: 'guild' },
    { path: 'table', component: GuildTableComponent, outlet: 'guild'}
  ]}
]


@NgModule({
  declarations: [
    GuildComponent,
    GuildAchivementsComponent,
    GuildGalleryComponent,
    GuildAchivementsComponent,
    GuildTableComponent,
    GuildNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    TableModule,
    SliderModule,
    MultiSelectModule,
    CheckboxModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    DialogModule
  ],
  exports: [
  ]
})
export class GuildModule { }


