import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layout/login/login.component';
import { SignupComponent } from './layout/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './layout/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GardenDesignerComponent } from './pages/garden-designer/garden-designer.component';
import { GardenDesignerModalComponent } from './pages/garden-designer-modal/garden-designer-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    LoadingComponent,
    GardenDesignerComponent,
    GardenDesignerModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
