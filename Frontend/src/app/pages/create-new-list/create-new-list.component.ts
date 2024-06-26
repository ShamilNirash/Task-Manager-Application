import { Component } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-new-list',
  templateUrl: './create-new-list.component.html',
  styleUrls: ['./create-new-list.component.scss'],
})
export class CreateNewListComponent {
  newListName = '';
  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  onClick() {
    this.taskService.createNewList(this.newListName).subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: err => {
        console.log(err.message);
      },
    });
  }
}
