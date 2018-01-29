import { Component } from '@angular/core';

import {TaskService} from '../services/task.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ TaskService 
             ]
})
export class HomeComponent {
  title = 'Task Management System';
}
