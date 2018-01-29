var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

var taskService = require('../task');
var taskModel = require('../../models/task');

describe('test task service',()=>{

   describe('test getAll method',()=>{

        let stubedFind; 
        beforeEach(() => {
            stubedFind = sinon.stub(taskModel, 'find');
        }); 
        afterEach(() => {
        stubedFind.restore();
        });
    
        it('test getAll method when taskmodel return the data',()=>{
            let taskList = ['Task1 ', 'Task 2', 'Task 2'];
            stubedFind.returnsPromise().resolves(taskList);
    
            let result = taskService.getAll();
    
            return expect(result).to.eventually.equal(taskList);
    
        });
    
        it('test getAll method when model rejects due to an unforseen error',()=>{
            stubedFind.returnsPromise().rejects({status:false});
    
            let result = taskService.getAll();
    
            return expect(result).to.be.rejected;  
        
    
        });
    

   });






   describe('test getTaskDetails method',()=>{

        let stubedFindById; 
        beforeEach(() => {
            stubedFindById = sinon.stub(taskModel, 'findById');
        }); 
        afterEach(() => {
            stubedFindById.restore();
        });

        it('test getTaskDetails method when taskmodel return the expected data',()=>{
            let taskObj1 = {task_name:'test task1'};
            let taskObj2 = {task_name:'test task2'};

            stubedFindById.returnsPromise().withArgs('1').resolves(taskObj1);
            stubedFindById.returnsPromise().withArgs('2').resolves(taskObj2);

            var result = taskService.getTaskDetails('1');
            expect(result).to.eventually.equal(taskObj1);


            var result = taskService.getTaskDetails('2');
            return expect(result).to.eventually.equal(taskObj2);


        });

        

        it('test getTaskDetails method when model rejects due to an unforseen error',()=>{
            stubedFindById.returnsPromise().rejects({status:false});

            let result = taskService.getTaskDetails('1');

            return expect(result).to.be.rejected;  
        

        });


    });




    describe('test create method',()=>{

        let stubedCreate; 
        let taskObj = {task_name:'test task1'};
        let taskObjWithId = {_id:'123456789',task_name:'test task1'};
        beforeEach(() => {
            stubedCreate = sinon.stub(taskModel, 'create');
        }); 
        afterEach(() => {
            stubedCreate.restore();
        });

        it('test create method when taskmodel return the expected data',()=>{
            
            stubedCreate.returnsPromise().withArgs(taskObj).resolves(taskObjWithId);

            let result = taskService.create(taskObj);
            return expect(result).to.eventually.equal(taskObjWithId);

        });
        

        it('test create method when model rejects due to an unforseen error',()=>{
            stubedCreate.returnsPromise().rejects({status:false});

            let result = taskService.create(taskObj);
            return expect(result).to.eventually.be.rejected.and.eventually.have.property('message','Error Occured! <br>Please enter all the mandatory information.');      

        });


    });




    describe('test update method',()=>{

        let stubedUpdate; 
        let taskId = '123456789';
        let taskObj = {task_name:'test task1'};
        let taskObjWithId = {_id:'123456789',task_name:'test task1'};
        beforeEach(() => {
            stubedUpdate = sinon.stub(taskModel, 'findByIdAndUpdate');
        }); 
        afterEach(() => {
            stubedUpdate.restore();
        });

        it('test update method when taskmodel return the expected data',()=>{
            
            stubedUpdate.returnsPromise().withArgs(taskId,taskObj).resolves(taskObjWithId);

            let result = taskService.update(taskObj,taskId);
            return expect(result).to.eventually.equal(taskObjWithId);

        });
        

        it('test update method when model rejects due to an unforseen error',()=>{
            stubedUpdate.returnsPromise().rejects({status:false});

            let result = taskService.update(taskObj,taskId);
            return expect(result).to.be.rejected;      

        });


    });


    describe('test delete method',()=>{

        let stubedDelete; 
        let taskId = '123456789';
        let taskObjWithId = {_id:'123456789',task_name:'test task1'};
        beforeEach(() => {
            stubedDelete = sinon.stub(taskModel, 'findByIdAndRemove');
        }); 
        afterEach(() => {
            stubedDelete.restore();
        });

        it('test delete method when taskmodel return the expected data',()=>{
            
            stubedDelete.returnsPromise().withArgs(taskId).resolves(taskObjWithId);

            let result = taskService.delete(taskId);
            return expect(result).to.eventually.equal(taskObjWithId);

        });
        

        it('test delete method when model rejects due to an unforseen error',()=>{
            stubedDelete.returnsPromise().rejects({status:false});

            let result = taskService.delete(taskId);
            return expect(result).to.be.rejected;      

        });


    });

});