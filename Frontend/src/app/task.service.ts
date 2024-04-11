import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { List } from './models/list.model';
import { Task } from './models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  readonly BASE_URL;
  constructor(private http: HttpClient) {
    this.BASE_URL = 'http://localhost:3000';
  }

  getList(): Observable<List[]> {
    return this.http.get<List[]>(`${this.BASE_URL}/lists`);
  }
  createNewList(title: string) {
    console.log(title);
    return this.http.post(`${this.BASE_URL}/lists`, { title });
  }

  getTaskList(id: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.BASE_URL}/lists/${id}/tasks`);
  }
  createTaskList(id: string, title: string) {
    return this.http.post(`${this.BASE_URL}/lists/${id}/tasks`, { title });
  }
  updateCompletedTasks(task: Task) {
    return this.http.patch(
      `${this.BASE_URL}/lists/${task.listId}/tasks/${task._id}`,
      { isCompleted: task.isCompleted }
    );
  }
}
