import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-create-new-task',
  templateUrl: './create-new-task.component.html',
  styleUrls: ['./create-new-task.component.scss'],
})
export class CreateNewTaskComponent {
  taskName = '';
  constructor(
    private taskService: TaskService,
    private router: ActivatedRoute,
    private rout: Router
  ) {}

  onClick() {
    this.router.params.subscribe({
      next: (param: Params) => {
        if (param) {
          this.taskService
            .createTaskList(param['listId'], this.taskName)
            .subscribe({
              next: () => {
                this.rout.navigateByUrl(`/lists/${param['listId']}`);
              },
              error: err => {
                console.log(err.message);
              },
            });
        }
      },
      error: err => {
        console.log(err.message);
      },
    });
  }
}
