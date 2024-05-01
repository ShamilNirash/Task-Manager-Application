import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-update-list',
  templateUrl: './update-list.component.html',
  styleUrls: ['./update-list.component.scss']
})
export class UpdateListComponent {
  updateListName = '';
  current_id:string='';
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route:ActivatedRoute
  ) {
  }
  ngOnInit(){
    this.route.params.subscribe((params:Params)=>{
      this.current_id =params['listId']

    })
  }
    
  onClick() {
    this.taskService.updateList(this.current_id,this.updateListName).subscribe(
    {
      next:()=>{this.router.navigate(['/'])},
      error:(err)=>{console.log(err)}
    })
  }
}


