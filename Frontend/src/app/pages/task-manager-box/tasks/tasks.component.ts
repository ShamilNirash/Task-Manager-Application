import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  active: any = '';
  taskItems: any[] = [];
  constructor(
    private taskService: TaskService,
    private router: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit() {
    this.router.params.subscribe((params: Params) => {
      if (params['listId']) {
        this.taskService.getTaskList(params['listId']).subscribe({
          next: (list: any) => {
            this.taskItems = list;
          },
          error: err => {
            console.log(err.message);
          },
        });
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
}
