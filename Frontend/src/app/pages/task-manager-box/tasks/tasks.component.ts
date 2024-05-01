import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  taskItems: Task[] = [];
  isNotEmptyTasks = false;
  iconDelete = faTrash;
  iconUpdate = faPenToSquare;
  activeListId = '';
  constructor(
    private taskService: TaskService,
    private router: ActivatedRoute,
    private route: Router
  ) { }
  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      if (params['listId']) {
        this.activeListId = params['listId']
        this.isNotEmptyTasks = true;
        this.taskService.getTaskList(params['listId']).subscribe({
          next: (tasks: Task[]) => {
            this.taskItems = tasks;
          },
          error: err => {
            console.log(err.message);
          },
        });
      } else {
        this.isNotEmptyTasks = false;
      }
    });
  }

  createNewTask() {
    this.router.params.subscribe({
      next: (param: Params) => {
        /* if list id id not define it is not go to add new task component  */
        if (param['listId']) {
          this.route.navigateByUrl(`/lists/${param['listId']}/create-task`);
        } else {
          this.route.navigateByUrl('/');
        }
      },
      error: err => {
        err.message;
      },
    });
  }

  setCompleted(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.taskService.updateCompletedTasks(task).subscribe({
      error: err => {
        console.log(err.message);
      },
    });
  }
  deleteItem(id: string) {
    
    this.taskService.deleteTaskList(this.activeListId, id).subscribe(
      {
        next: () => { this.taskItems = this.taskItems.filter(item => item._id !== id);
          this.route.navigate([`/lists/${this.activeListId}`]) },
        error: (err) => { console.log(err.message);
        }

      }
    )
  }
  
  
}
