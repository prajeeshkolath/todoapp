var chai = require('chai');
var should = chai.should();

var chaiHttp = require('chai-http');
chai.use(chaiHttp);


var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);


var taskService = require('../../services/task');
var server = require('../../../server');


describe('test task routes',()=>{

   describe('test GET /tasks',()=>{


    let stubedGetAll; 
    beforeEach(() => {
        stubedGetAll = sinon.stub(taskService, 'getAll');
    }); 
    afterEach(() => {
        stubedGetAll.restore();
    });

      it('GET /api/tasks should send an array of tasks, when service fetches the data',(done)=>{

        let taskList = ['Task1 ', 'Task 2', 'Task 2'];
        stubedGetAll.returnsPromise().resolves(taskList); 

        chai.request(server)
        .get('/api/tasks')
        .end(function(err, res){
          // console.log(res);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('result').with.lengthOf(3); 
          done();
        });

      });

      it('GET /api/tasks should send 500 error code, when service layer throws exception for unknown reasons',(done)=>{

        
        stubedGetAll.returnsPromise().throws({error:true}); 

        chai.request(server)
        .get('/api/tasks')
        .end(function(err, res){
          // console.log(res);
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error',true); 
          done();
        });

      });

      it('GET /api/tasks should send 500 error code, when service layer rejects the promise',(done)=>{

        
        stubedGetAll.returnsPromise().rejects({error:true}); 

        chai.request(server)
        .get('/api/tasks')
        .end(function(err, res){
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error',true); 
          done();
        });

      });


   });

   describe('test GET /api/tasks/:taskId',()=>{


    let stubedGetTaskDetails; 
    
    beforeEach(() => {
        stubedGetTaskDetails = sinon.stub(taskService, 'getTaskDetails');
    }); 
    afterEach(() => {
        stubedGetTaskDetails.restore();
    });

      it('GET /api/tasks/:taskId should send an object , when service fetches the data',(done)=>{

        let taskId = '123456789';
        let taskName = 'Task1';
        let taskObject = {_id:taskId,task_name:taskName};
        
        stubedGetTaskDetails.returnsPromise().withArgs(taskId).resolves(taskObject); 

        chai.request(server)
        .get('/api/tasks/'+taskId)
        .end(function(err, res){
          // console.log(res);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.result.task_name.should.be.equal(taskName); 
          done();
        });

      });

      it('GET /api/tasks/:taskId should send 500 error code, when service layer throws exception for unknown reasons',(done)=>{

        
        stubedGetTaskDetails.returnsPromise().throws({error:true}); 

        chai.request(server)
        .get('/api/tasks/123456789')
        .end(function(err, res){
          // console.log(res);
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error',true); 
          done();
        });

      });

      it('GET /api/tasks/:taskId should send 500 error code, when service layer rejects the promise',(done)=>{

        
        stubedGetTaskDetails.returnsPromise().rejects({error:true}); 

        chai.request(server)
        .get('/api/tasks/123456789')
        .end(function(err, res){
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error',true); 
          done();
        });

      });


   });


   describe('test POST /api/tasks',()=>{


    let stubedCreate; 
    let taskId = '123456789';
    let taskName = 'Task1';
    let taskObject = {task_name:taskName};
    let taskObjectWithId = {_id:taskId,task_name:taskName};
    
    beforeEach(() => {
        stubedCreate = sinon.stub(taskService, 'create');
    }); 
    afterEach(() => {
        stubedCreate.restore();
    });

      it('POST /api/tasks should create an object, when service creats the task successfully',(done)=>{
        
        
        stubedCreate.returnsPromise().withArgs(taskObject).resolves(taskObjectWithId); 

        chai.request(server)
        .post('/api/tasks')        
        .send(taskObject)
        .end(function(err, res){
          // console.log(res);
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.result._id.should.be.equal(taskId); 
          done();
        });

      });

      it('POST /api/tasks send 500 error code, when service layer throws exception for unknown reasons',(done)=>{

        
        stubedCreate.returnsPromise().throws({error:true}); 

        chai.request(server)
        .post('/api/tasks')
        .send(taskObject)
        .end(function(err, res){
          // console.log(res);
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error',true); 
          done();
        });

      });

      it('POST /api/tasks should send 500 error code, when service layer rejects the promise',(done)=>{

        
        stubedCreate.returnsPromise().rejects({error:true}); 

        chai.request(server)
        .get('/api/tasks/123456789')
        .end(function(err, res){
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error',true); 
          done();
        });

      });


   });





   describe('test PUT /api/tasks/:taskId',()=>{


    let stubedUpdate; 
    let taskId = '123456789';
    let taskName = 'Task1';
    let taskObject = {task_name:taskName};
    let taskObjectWithId = {_id:taskId,task_name:taskName};
    
    beforeEach(() => {
        stubedUpdate = sinon.stub(taskService, 'update');
    }); 
    afterEach(() => {
        stubedUpdate.restore();
    });

      it('PUT /api/tasks/:taskId should update the object and returns the updated object, when service update the task successfully',(done)=>{
        
        
        stubedUpdate.returnsPromise().withArgs(taskObject,taskId).resolves(taskObjectWithId); 

        chai.request(server)
        .put('/api/tasks/'+taskId)        
        .send(taskObject)
        .end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.result._id.should.be.equal(taskId); 
          done();
        });

      });

      it('PUT /api/tasks/:taskId send 500 error code, when service layer throws exception for unknown reasons',(done)=>{

        
        stubedUpdate.returnsPromise().throws({error:true}); 

        chai.request(server)
        .put('/api/tasks/'+taskId)        
        .send(taskObject)
        .end(function(err, res){
          // console.log(res);
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error',true); 
          done();
        });

      });

      it('PUT /api/tasks/:taskId should send 500 error code, when service layer rejects the promise',(done)=>{

        
        stubedUpdate.returnsPromise().rejects({error:true}); 

        chai.request(server)
        .put('/api/tasks/'+taskId)        
        .send(taskObject)
        .end(function(err, res){
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error',true); 
          done();
        });

      });


   });


   describe('test DELETE /api/tasks/:taskId',()=>{


    let stubedDelete; 
    let taskId = '123456789';
    let taskName = 'Task1';
    let taskObject = {task_name:taskName};
    let taskObjectWithId = {_id:taskId,task_name:taskName};
    
    beforeEach(() => {
        stubedDelete = sinon.stub(taskService, 'delete');
    }); 
    afterEach(() => {
        stubedDelete.restore();
    });

      it('DELETE /api/tasks/:taskId should update the object and returns the updated object, when service update the task successfully',(done)=>{
        
        
        stubedDelete.returnsPromise().withArgs(taskId).resolves(taskObjectWithId); 

        chai.request(server)
        .delete('/api/tasks/'+taskId)  
        .end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.result._id.should.be.equal(taskId); 
          done();
        });

      });

      it('DELETE /api/tasks/:taskId should send 500 error code, when service layer throws exception for unknown reasons',(done)=>{

        
        stubedDelete.returnsPromise().throws({error:true}); 

        chai.request(server)
        .delete('/api/tasks/'+taskId)
        .end(function(err, res){
          // console.log(res);
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error',true); 
          done();
        });

      });

      it('DELETE /api/tasks/:taskId should send 500 error code, when service layer rejects the promise',(done)=>{

        
        stubedDelete.returnsPromise().rejects({error:true}); 

        chai.request(server)
        .delete('/api/tasks/'+taskId)
        .end(function(err, res){
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('error',true); 
          done();
        });

      });


   });




});



