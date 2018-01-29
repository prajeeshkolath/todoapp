var User = require('../models/user.js');

module.exports = {
    
    getAll:() => {
        return new Promise((resolve,reject) => {
            User.find()
           .then((users)=>{
   
               resolve(users);
   
           })
           .catch((err)=>{
               reject(err);
           });
   
   
         });
        
      }
      
}