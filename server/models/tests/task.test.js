var expect = require('chai').expect;

var Task = require('../task');



describe('test task model',()=>{

   it('should be invalid if task_name is empty',(done)=>{

      taskObj = new Task(); 
      taskObj.validate((err)=>{   
           expect(err.errors.task_name).to.exist;
           done();
      });      
   });


   it('should be invalid if assigned_user is not a document id',(done)=>{

    taskObj = new Task({assigned_user:'not a document id'}); 
    taskObj.validate((err)=>{   
         expect(err.errors.assigned_user).to.exist;
         done();
    });      
 });

 it('should be invalid if created_by_user is not a document id',(done)=>{

    taskObj = new Task({created_by_user:'not a document id'}); 
    taskObj.validate((err)=>{   
         expect(err.errors.created_by_user).to.exist;
         done();
    });      
 });

   it('should be invalid if created_by_user is empty',(done)=>{

    taskObj = new Task();  
    taskObj.validate((err)=>{   
         expect(err.errors.created_by_user).to.exist;
         done();
    });      
 });
   it('should be invalid if created_by_user_name is empty',(done)=>{

    taskObj = new Task();    
    taskObj.validate((err)=>{   
         expect(err.errors.created_by_user_name).to.exist;
         done();
    });      
 });

   it('should be invalid if last_updated_on is empty',(done)=>{

    taskObj = new Task();    
    taskObj.validate((err)=>{   
         expect(err.errors.last_updated_on).to.exist;
         done();
    });      
 });

   it('should be invalid if created_on is empty',(done)=>{

    taskObj = new Task();    
    taskObj.validate((err)=>{   
         expect(err.errors.created_on).to.exist;
         done();
    });      
 });

   it('should be invalid if last_updated_on is not a date',(done)=>{

    taskObj = new Task({last_updated_on:'not a date'});    
    taskObj.save({task_name:'testing from mocha'});
    taskObj.validate((err)=>{   
         expect(err.errors.last_updated_on).to.exist;
         done();
    });      
 });

   it('should be invalid if created_on is not a date',(done)=>{

    taskObj = new Task({created_on:'not a date'});  
    taskObj.validate((err)=>{   
         expect(err.errors.created_on).to.exist;
         done();
    });      
 });
   it('should be invalid if due by is not a date',(done)=>{

    taskObj = new Task({due_by:'not a date'}); 
    taskObj.validate((err)=>{   
         expect(err.errors.due_by).to.exist;
         done();
    });      
 });

 it('should be invalid if due by is not a date',(done)=>{

    taskObj = new Task({due_by:'not a date'}); 
    taskObj.validate((err)=>{   
         expect(err.errors.due_by).to.exist;
         done();
    });      
 });




});