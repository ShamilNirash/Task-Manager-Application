import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskManagerAppComponent } from './pages/task-manager-app/task-manager-app.component';
import { CreateNewListComponent } from './pages/create-new-list/create-new-list.component';
import { CreateNewTaskComponent } from './pages/create-new-task/create-new-task.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { UpdateListComponent } from './pages/update-list/update-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: 'create-list', component: CreateNewListComponent },
  { path: 'lists', component: TaskManagerAppComponent },
  { path: 'lists/:listId', component: TaskManagerAppComponent },
  { path: 'lists/:listId/create-task', component: CreateNewTaskComponent },
  { path: 'user/signup', component: SignupComponent },
  {path:'user/login', component:LoginComponent},
  {path:'lists/:listId/update',component:UpdateListComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
