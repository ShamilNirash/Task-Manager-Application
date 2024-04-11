import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskManagerBoxComponent } from './pages/task-manager-box/task-manager-box.component';
import { TasksComponent } from './pages/task-manager-box/tasks/tasks.component';
import { TasklistComponent } from './pages/task-manager-box/tasklist/tasklist.component';
import { TaskManagerAppComponent } from './pages/task-manager-app/task-manager-app.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateNewListComponent } from './pages/create-new-list/create-new-list.component';
import { FormsModule } from '@angular/forms';
import { CreateNewTaskComponent } from './pages/create-new-task/create-new-task.component';
import { SignupComponent } from './pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskManagerBoxComponent,
    TasksComponent,
    TasklistComponent,
    TaskManagerAppComponent,
    CreateNewListComponent,
    CreateNewTaskComponent,
    SignupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
