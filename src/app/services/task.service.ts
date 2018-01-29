import { Injectable } from '@angular/core';
import {AxiosService} from './axios.service';
import 'rxjs/add/operator/toPromise';
import * as _ from 'lodash';

import {Task} from './../interfaces/task.interface';

@Injectable()
export class TaskService {
  tasks:Task[];

	constructor( private axios_service:AxiosService) {        
    }
    getAllTaks(refresh:boolean = false):Promise<any>{

        return this.axios_service.get('/api/tasks')
        .then((response)=> {          
           this.tasks = response.data.result
           return this.tasks;
        })
        .catch((err) =>{           
            throw err;          
        });
    }

    getTaskDetails(task_id:String):Promise<any> {
       if(this.tasks && this.tasks.length) {
          return new Promise((resolve,reject)=> {
            var task_details = _.find(this.tasks,{_id:task_id}); 
             resolve(task_details);
          });
       } 
        return this.axios_service.get('/api/tasks/'+task_id)
               .then((response)=> {
                   return response.data.result;
               }).catch((err)=>{
                  throw err;
               });       

    }

    createTask(task):Promise<any> {
      
        return this.axios_service.post('/api/tasks',task)
        .then((response)=> {    
               
           return response.data;
        })
        .catch((err) =>{   
            throw err;           
        });
    }

    updateTask(task,taskId):Promise<any> {
        return this.axios_service.put('/api/tasks/'+taskId,task)
        .then((response)=> {           
           return response.data;
        })
        .catch((err) =>{           
            throw err;           
        });
    }
    deleteTask(taskId):Promise<any> {
        return this.axios_service.delete('/api/tasks/'+taskId)
        .then((response)=> {           
           return response.data;
        })
        .catch((err) =>{           
            throw err;         
        });
    }


}