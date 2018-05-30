import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadMeComponent } from './read-me/read-me.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LoadingWheelComponent } from './loading-wheel/loading-wheel.component';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [ReadMeComponent, LoadingWheelComponent],
  exports:[ReadMeComponent, LoadingWheelComponent]
})
export class UtilsModule { }
