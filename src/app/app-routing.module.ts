import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToDoComponent } from './components/toDo/to-do/to-do.component';
import { FullGridComponent } from './components/Post-it/grid/grid.component';

const routes: Routes = [
  { path: 'todo', component: ToDoComponent },
  { path: 'postit', component: FullGridComponent },
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
