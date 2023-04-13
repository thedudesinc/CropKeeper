import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../layout/header/header.component';
import { PagesComponent } from './pages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: '', component: DashboardComponent }
    ]
  }
];

@NgModule({
  declarations: [
    HeaderComponent,
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ]
})
export class PagesModule { }
