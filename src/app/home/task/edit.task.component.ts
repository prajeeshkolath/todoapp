import { Component,ViewChild,ElementRef } from '@angular/core';
import { OnInit,OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import {Router, ActivatedRoute, Params} from '@angular/router';

import * as _ from 'lodash';
import * as async from 'async';
import * as moment from 'moment/moment';

import {UserService} from '../../services/user.service';
import {TaskService} from '../../services/task.service';

import {User} from '../../interfaces/user.interface';
import {Task} from '../../interfaces/task.interface';
import { NgForm } from '@angular/forms';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-task',
  templateUrl: './edit.task.component.html',
})
export class EditTaskComponent implements OnInit {
  private title = 'Task Management System';
  private users:User[];
  private task:Task;
  private calendar:any;
  private task_id:String;

  @ViewChild('error_message')private errorMessage : ElementRef
  constructor(
    private userService:UserService,
    private taskService:TaskService,
    private activatedRoute: ActivatedRoute,
    private router:Router
    ) { }

  
  ngOnInit() {
    //initialize the task variable
    this.task = {task_name:'',assigned_user:'',due_by:new Date()};
    
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      this.task_id = params['taskId'];
      
      if(this.task_id) {
        this.taskService
            .getTaskDetails(this.task_id)
            .then((task_details)=>{

              this.task = task_details;

              // set calendar value
              var due_date = moment(this.task.due_by,"YYYY-MM-DDTHH:mm:ss.SSS");
              var year_val = due_date.year(),month_val = due_date.month()+1,day_val=due_date.date();
              this.calendar = {year:year_val,month:month_val,day:day_val};
              
            })
            .catch((err)=>{

            });
      }
      


    });
  
    
    this.userService.getAllUsers().then((result) => {     
         this.users = result;
    })
    .catch((error) => {
    });

  }

  save(form:NgForm) {

        var dateVal:number[] = _.values(form.value.dp);
        let due_date:Date =  new Date(dateVal[0],dateVal[1]-1,dateVal[2]);

        let temp_task = _.clone(form.value);
        delete(temp_task.dp);  // remove the datepicker value from the task
        

        this.task = temp_task;
        this.task.due_by = due_date;
        let assigned_user_name:string = _.result(_.find(this.users, function(obj) {
                           return obj._id === temp_task.assigned_user;
                       }), 'name');

        this.task.assigned_user_name = assigned_user_name;

        // if the task already exists update it
        if(this.task_id) {

          // call the service to create the task
          this.taskService.updateTask(this.task,this.task_id)
          .then((result) => {
            console.log("Saved successfully..");
            this.router.navigate(['/home/tasks/view']);
          })
          .catch((err)=>{
              console.log(err);
              this.errorMessage.nativeElement.insertAdjacentHTML('beforeend',err.result.message);
          });

        } else {
          
          // call the service to create the task
          this.taskService.createTask(this.task)
          .then((result) => {
            console.log("Saved successfully..");
            this.router.navigate(['/home/tasks/view']);
          })
          .catch((err)=>{
              console.log(err);
              this.errorMessage.nativeElement.insertAdjacentHTML('beforeend',err.result.message);
          });


        }

  }


}

