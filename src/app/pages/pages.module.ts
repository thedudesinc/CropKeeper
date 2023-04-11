import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../layout/header/header.component';
import { RootComponent } from './root.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '', component: RootComponent, children: [
      { path: '', component: DashboardComponent }
    ]
  }
];

@NgModule({
  declarations: [
    HeaderComponent,
    RootComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule
  ]
})
export class PagesModule { }
