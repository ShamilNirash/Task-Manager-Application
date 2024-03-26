import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService:WebRequestService) { }

  createNewList(title:string){
   return this.webReqService.post('lists',{title});
  }

  getList(){
    return this.webReqService.get('lists');
  }

  getTaskList(id:string){
    return this.webReqService.get(`lists/${id}/tasks`)
  }

}
