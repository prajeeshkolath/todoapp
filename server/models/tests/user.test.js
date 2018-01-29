var expect = require('chai').expect;
var sinon = require('sinon');

var User = require('../user');

describe('test user model',()=>{

    it('should be invalid if name is empty',(done)=>{
 
       userObj = new User(); 
       userObj.validate((err)=>{   
            expect(err.errors.name).to.exist;
            done();
       });      
    });

    it('should fail if an invalid phone number is entered',(done)=>{
 
        userObj = new User({phone:'999-777777'}); 
        userObj.validate((err)=>{   
             expect(err.errors.phone).to.exist;
             done();
        });      
     });

});