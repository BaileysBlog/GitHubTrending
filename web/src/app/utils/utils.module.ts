import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadMeComponent } from './read-me/read-me.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LoadingWheelComponent } from './loading-wheel/loading-wheel.component';
import { ServiceProviderModule } from '../Services/service-provider.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ServiceProviderModule
  ],
  declarations: [ReadMeComponent, LoadingWheelComponent],
  exports:[ReadMeComponent, LoadingWheelComponent]
})
export class UtilsModule { }
