import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TaskComponent} from './home/task/task.component';
import {EditTaskComponent} from './home/task/edit.task.component';
import {LoginComponent} from './login/login.component';


// Route Configuration
export const routes: Routes = [
    { path: '', redirectTo: '/home/tasks/view', pathMatch: 'full' },    
    
      { path: "login", component: LoginComponent,pathMatch:'full' },
      { path: 'home', redirectTo: '/home/tasks/view', pathMatch: 'full' } ,
    {
      path: "home", component: HomeComponent,
      children: [
          {
              path: 'tasks/view',
              component: TaskComponent
          },
          {
            path: 'tasks/edit/:taskId',
            component: EditTaskComponent
         },
         {
          path: 'tasks/edit',
          component: EditTaskComponent
         }
         ]
      }

    ];
  
 
 export const routing: ModuleWithProviders = RouterModule.forRoot(routes);