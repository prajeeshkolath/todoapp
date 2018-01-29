var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var sinon = require('sinon');
var sinonStubPromise = require('sinon-stub-promise');
sinonStubPromise(sinon);

var userService = require('../user');
var userModel = require('../../models/user');


describe('test user service',()=>{

    describe('test getAll method',()=>{

        let stubedFind; 
        beforeEach(() => {
            stubedFind = sinon.stub(userModel, 'find');
        }); 
        afterEach(() => {
        stubedFind.restore();
        });
    
        it('test getAll method when taskmodel return the data',()=>{
            let userList = ['User1 ', 'User2', 'User3'];
            stubedFind.returnsPromise().resolves(userList);
    
            let result = userService.getAll();
    
            return expect(result).to.eventually.equal(userList);
    
        });

        it('test getAll method when model rejects due to an unforseen error',()=>{
            stubedFind.returnsPromise().rejects({status:false});
    
            let result = userService.getAll();
    
            return expect(result).to.be.rejected;  
        
    
        });

    });

});