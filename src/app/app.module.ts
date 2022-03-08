import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { COMPONENTS } from './components/componets';
import { FilterPipe } from './pipe/filter.pipe';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { SharedModule } from './shared/shared.module';
import { DialogFinancialComponent } from './components/financial-control/dialog-financial/dialog-financial.component';

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS,
    FilterPipe,
    DialogFinancialComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule,
    FontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
