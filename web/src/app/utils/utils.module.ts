import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadMeComponent } from './read-me/read-me.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LoadingWheelComponent } from './loading-wheel/loading-wheel.component';
import { ServiceProviderModule } from '../Services/service-provider.module';
import { RepoPreviewComponent } from './repo-preview/repo-preview.component';
import { RouterModule } from '@angular/router';
import { SanitizeHtmlPipe } from './Pipes/html-sanitize.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    ServiceProviderModule
  ],
  declarations: [ReadMeComponent, LoadingWheelComponent, RepoPreviewComponent, SanitizeHtmlPipe],
  exports:[ReadMeComponent, LoadingWheelComponent, RepoPreviewComponent, SanitizeHtmlPipe]
})
export class UtilsModule { }
