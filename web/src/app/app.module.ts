import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepoScreenComponent } from './repo-screen/repo-screen.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CommonModule } from '@angular/common';
import { UtilsModule } from './utils/utils.module';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ServiceProviderModule } from './Services/service-provider.module';
import { TrendingScreenComponent } from './trending-screen/trending-screen.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    RepoScreenComponent,
    NavMenuComponent,
    TrendingScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ServiceProviderModule,
    UtilsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
