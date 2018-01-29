
import {Location,CommonModule  } from "@angular/common";
import {TestBed, fakeAsync, tick, async, flushMicrotasks} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './home/header/header.component';
import { SidemenuComponent } from './home/sidemenu/sidemenu.component';
import { TaskComponent } from './home/task/task.component';

import {routes,routing } from './app.routing';



describe('Router: App', () => {


  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule ,
        RouterTestingModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [        
        AppComponent,
        HomeComponent,
        TaskComponent,
        LoginComponent,
        HeaderComponent,
        SidemenuComponent

      ]
    }).compileComponents();
    router = TestBed.get(Router); 
    location = TestBed.get(Location); 

    fixture = TestBed.createComponent(AppComponent); 
    
    router.initialNavigation(); 
  });

  it('navigate to "" redirects you to /login', fakeAsync(() => { 
    console.log('...====initial=='+router.url);  
    router.navigate([''])
        .then(() => {
          expect(router.url).toEqual('/login');
          console.log('...====laterff=='+location.path()); 
        }).catch(()=>{
          expect(router.url).toEqual('/login');
        }


        );

        //tick is not working somehow (ie fakeAsync/tick) . asyc or fakeAsync works with the current approach

        
  }));


});

