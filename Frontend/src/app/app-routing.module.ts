import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagerAppComponent } from './pages/task-manager-app/task-manager-app.component';

const routes: Routes = [
  {path:"" , component:TaskManagerAppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
