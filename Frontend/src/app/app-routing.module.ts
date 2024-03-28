import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagerAppComponent } from './pages/task-manager-app/task-manager-app.component';
import { CreateNewListComponent } from './pages/create-new-list/create-new-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: 'create-list', component: CreateNewListComponent },
  { path: 'lists', component: TaskManagerAppComponent },
  { path: 'lists/:listId', component: TaskManagerAppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
