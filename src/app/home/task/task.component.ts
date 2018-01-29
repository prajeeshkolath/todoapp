import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service'
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
/*import * as moment from 'moment/moment';*/
import { MomentModule } from 'angular2-moment/moment.module';
import * as _ from 'lodash';
import {Task} from '../../interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  private title = 'Task Management System';
  private tasks:Task[];
  constructor(private taskService:TaskService) { }

  ngOnInit() {
  
    this.taskService.getAllTaks(true).then((result) => {
         this.tasks = result;
    })
    .catch((error) => {
          
            console.log('RESPONSE'+JSON.stringify(error));
    });

  }
  onDelete(task_id) {
    
    let temp_tasks = _.filter(this.tasks,(task)=>{
         return task._id != task_id;
    });
    this.tasks = temp_tasks;
    
    this.taskService.deleteTask(task_id)
                    .then((response)=>{
                        
                    })
                    .catch((err)=>{

                    });

  }

}

