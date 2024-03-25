import { Component } from '@angular/core';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent {
  taskList=['Frontend','Backend','Server Tasks','Server Tasks'];
   constructor(private taskService:TaskService){

   }


  onClick(){
     this.taskService.createNewList('testing').subscribe((response:any)=>{console.log(response);});
  }
}
