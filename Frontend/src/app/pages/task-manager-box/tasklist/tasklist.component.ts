import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent {
  taskList:any[]=[];
  constructor(private taskService:TaskService, private route:ActivatedRoute){

  }
  ngOnInit(){
  
  
  this.taskService.getList().subscribe((lists:any)=>{this.taskList=lists})
  
  }
  
  
   
}
