import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { List } from 'src/app/models/list.model';
import { TaskService } from 'src/app/task.service';
import{faTrash,faPenToSquare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss'],
})
export class TasklistComponent implements OnInit {
  taskList: List[] = [];
  iconDelete = faTrash;
  iconUpdate=  faPenToSquare;
  isClicked= false;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.taskService.getList().subscribe({
      next: (list: List[]) => {
        this.taskList = list;
      },
      error: err => {
        console.log(err.message);
      },
    });
  }
  deleteItem(id:string){
    this.taskService.deleteList(id).subscribe({
    next:()=>{this.router.navigate(['/lists']);},
    error:(err)=>{console.log(err)}
    });
    
  }
  updateItem(id:string){
     this.router.navigate([`lists/${id}/update`]);
  }
}
