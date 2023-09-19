import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../layout/header/header.component';
import { PagesComponent } from './pages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GardenDesignerComponent } from './garden-designer/garden-designer.component';
import { GardenDesignerToolbarComponent } from './garden-designer/components/garden-designer-toolbar/garden-designer-toolbar.component';
import { GardenDesignerTitlebarComponent } from './garden-designer/components/garden-designer-titlebar/garden-designer-titlebar.component';
import { GardenDesignerModalComponent } from './garden-designer/components/garden-designer-modal/garden-designer-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'designer/:id', component: GardenDesignerComponent },
      { path: 'designer', component: GardenDesignerComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
];

@NgModule({
  declarations: [
    HeaderComponent,
    PagesComponent,
    DashboardComponent,
    GardenDesignerComponent,
    GardenDesignerToolbarComponent,
    GardenDesignerTitlebarComponent,
    GardenDesignerModalComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    ReactiveFormsModule,
    LetModule,
  ],
})
export class PagesModule {}
