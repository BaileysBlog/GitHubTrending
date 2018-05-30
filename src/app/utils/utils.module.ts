import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadMeComponent } from './read-me/read-me.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  declarations: [ReadMeComponent],
  exports:[ReadMeComponent]
})
export class UtilsModule { }
