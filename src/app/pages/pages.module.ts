import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../layout/header/header.component';
import { PagesComponent } from './pages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GardenDesignerComponent } from './garden-designer/garden-designer.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent, children: [
      { path: '', component: DashboardComponent },
      { path: 'designer/:id', component: GardenDesignerComponent },
      { path: 'designer', component: GardenDesignerComponent }
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
