import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpModule,Http,RequestOptions,Response,Headers   } from '@angular/http';
import axios from 'axios';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AxiosService {
 
  private config;
  private token;

  
  constructor(
    private _router: Router
  ){
    this.getRequestHeaders();
    console.log('config..init.'+this.config);

    }
 
  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['Login']);
  }
  
 getRequestHeaders() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    this.token = user && user.token;
    this.config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      }
    };
 }
  post(url,data = {}) : Promise<any> {


    this.getRequestHeaders();
    return axios.post(url, data,this.config)
           .then(function (response) {              
              return response.data;
           })
           .catch(function(err) {
               throw err.response.data;
           });
     
 
  }

  put(url,data = {}) : Promise<any> {

    console.log("login service");



    this.getRequestHeaders();
    return axios.put(url, data,this.config)
           .then(function (response) {              
              return response.data;
           })
           .catch(function(err) {
              throw err.response.data;
           });
  }


  get(url) : Promise<any> {

    this.getRequestHeaders();
    return axios.get(url,this.config)
           .then(function (response) {              
              return response;
           })
           .catch(function(err) {
              throw err.response.data;
           });    
 
  }

  delete(url) : Promise<any> {

    this.getRequestHeaders();
    return axios.delete(url,this.config)
           .then(function (response) {              
              return response;
           })
           .catch(function(err) {
               throw err.response.data;
           });    
 
  }
 
   checkCredentials(){
    if (localStorage.getItem("user") === null) {
        this._router.navigate(['Login']);
    }
  } 
}

/*

var config = {
  headers: {'X-My-Custom-Header': 'Header-Value'}
};

axios.get('https://api.github.com/users/codeheaven-io', config);
axios.post('/save', { firstName: 'Marlon' }, config);

*/
