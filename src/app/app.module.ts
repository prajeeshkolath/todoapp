import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'angular2-moment';

import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './home/header/header.component';
import { SidemenuComponent } from './home/sidemenu/sidemenu.component';
import { TaskComponent } from './home/task/task.component';
import { EditTaskComponent } from './home/task/edit.task.component';

import { routing } from './app.routing';


import {AxiosService} from './services/axios.service';
import {UserService} from './services/user.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidemenuComponent,
    TaskComponent,
    HomeComponent,
    LoginComponent,
    EditTaskComponent 
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    MomentModule,
    NgbModule.forRoot()
  ],
  providers: [
    UserService,
    AxiosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
