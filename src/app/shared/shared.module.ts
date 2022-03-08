import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    DialogComponent,

  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    DialogComponent,
  ]
})
export class SharedModule { }
