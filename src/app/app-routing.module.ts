import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialControlComponent } from './components/financial-control/financial-control.component';

import { FullGridComponent } from './components/Post-it/grid/grid.component';
import { OptionsTabComponent } from './components/toDo/options-tab/options-tab.component';

const routes: Routes = [
  { path: 'todo', component: OptionsTabComponent },
  { path: 'postit', component: FullGridComponent },
  { path: 'financialcontrol', component: FinancialControlComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
