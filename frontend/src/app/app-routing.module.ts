import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { VisitorsCountComponent } from './components/visitors-count/visitors-count.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Todo',
    pathMatch: 'full'
  },
  {
    path: 'VisitorCount',
    component: VisitorsCountComponent
  },
  {
    path:'Todo',
    component: TodosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
