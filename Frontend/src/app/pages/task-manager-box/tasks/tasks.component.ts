import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {
  active:any='';
taskItems:any[]=[];
constructor(private taskService:TaskService,private router:ActivatedRoute){}

ngOnInit(){
  this.router.params.subscribe((params:Params)=>{
    this.taskService.getTaskList(params['listId']).subscribe({
      next:(list:any)=>{ this.taskItems=list;},
      error:(err)=>{console.log(err.message);
      }
    }
    
  )})
}


}
