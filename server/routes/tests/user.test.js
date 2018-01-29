var chai = require('chai');
var should = chai.should();

var chaiHttp = require('chai-http');
chai.use(chaiHttp);


var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);


var userService = require('../../services/user');
var server = require('../../../server');



describe('test user routes',()=>{

    describe('test GET /api/users',()=>{
 
 
     let stubedGetAll; 
     beforeEach(() => {
         stubedGetAll = sinon.stub(userService, 'getAll');
     }); 
     afterEach(() => {
         stubedGetAll.restore();
     });
 
       it('GET /api/users should send an array of users, when service fetches the data',(done)=>{
 
         let userList = ['User1 ', 'User 2', 'User 3'];
         stubedGetAll.returnsPromise().resolves(userList); 
 
         chai.request(server)
         .get('/api/users')
         .end(function(err, res){
           // console.log(res);
           res.should.have.status(200);
           res.body.should.be.a('object');
           res.body.should.have.property('result').with.lengthOf(3); 
           done();
         });
 
       });
 
       it('GET /api/users should send 500 error code, when service layer throws exception for unknown reasons',(done)=>{
 
         
         stubedGetAll.returnsPromise().throws({error:true}); 
 
         chai.request(server)
         .get('/api/users')
         .end(function(err, res){
           // console.log(res);
           res.should.have.status(500);
           res.body.should.be.a('object');
           res.body.should.have.property('error',true); 
           done();
         });
 
       });
 
       it('GET /api/users should send 500 error code, when service layer rejects the promise',(done)=>{
 
         
         stubedGetAll.returnsPromise().rejects({error:true}); 
 
         chai.request(server)
         .get('/api/users')
         .end(function(err, res){
           res.should.have.status(500);
           res.body.should.be.a('object');
           res.body.should.have.property('error',true); 
           done();
         });
 
       });
 
 
    });
}); 
