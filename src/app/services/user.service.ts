import { Injectable } from '@angular/core';
import {AxiosService} from './axios.service';
import 'rxjs/add/operator/toPromise';

import {User} from './../interfaces/user.interface';

@Injectable()
export class UserService {
  users:User[];
	constructor( private axios_service:AxiosService) {   
        
        
    }

    getAllUsers():Promise<any>{

        if(this.users && this.users.length) {
            return new Promise((resolve,reject)=> { 
               resolve(this.users);
            });
         } 
        return this.axios_service.get('/api/users')
        .then((response)=> {  
           this.users = response.data.result        
           return this.users;
           
        })
        .catch((error) =>{           
             return error.json();           
        });
    }


}
