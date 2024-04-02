import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
})
export class TasklistComponent implements OnInit {
  taskList: List[] = [];
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.taskService.getList().subscribe({
      next: (list: List[]) => {
        console.log(list);
        this.taskList = list;
        console.log(this.taskList);
      },
      error: err => {
        console.log(err.message);
      },
    });
  }
}
