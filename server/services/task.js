var Task = require('../models/task.js');

module.exports = {
    
   getAll:() => {
     return new Promise((resolve,reject) => {
        Task.find()
        .then((tasks)=>{
            resolve(tasks);
        })
        .catch((err)=>{
            reject({'message':'Error Occured! <br>Task list is not available.'});
        });
      });
     
   },
   getTaskDetails:(taskId) => {
    return new Promise((resolve,reject) => {
       Task.findById(taskId)
       .then((task)=>{
           resolve(task);
       })
       .catch((err)=>{
           reject({'message':'Error Occured! <br>Task informatin is not available.'});
       });
     });
    
  },
   create:(taskDetails) => {
    return new Promise((resolve,reject) => {

      // set other required fields such as current user info.
      // this will be removed when log in is place.
       taskDetails.created_by_user = taskDetails.assigned_user;
       taskDetails.created_by_user_name = taskDetails.assigned_user_name;
       taskDetails.last_updated_on = new Date().toISOString();
       taskDetails.created_on = new Date().toISOString();

       Task.create(taskDetails)
       .then((result)=>{
           resolve(result);
       })
       .catch((err)=>{           
           reject({'message':'Error Occured! <br>Please enter all the mandatory information.'});
       });
     });    
    
  },  
  update:(taskDetails,taskId) => {
    return new Promise((resolve,reject) => {
       Task.findByIdAndUpdate(taskId,taskDetails)
       .then((result)=>{
           resolve(result);
       })
       .catch((err)=>{
           reject({'message':'Error Occured! <br>Task was not updated.'});
       });
     });    
    
  },
  delete:(taskId) => {
    return new Promise((resolve,reject) => {
       Task.findByIdAndRemove(taskId)
       .then((result)=>{
           resolve(result);
       })
       .catch((err)=>{
           reject({'message':'Error Occured! <br>Task was not deleted.'});
       });
     });    
    
  }

}