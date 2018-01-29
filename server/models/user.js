const mongoose = require("../config/connection.js");
const Schema = mongoose.Schema;
// Create the schema for the Account database
const UserSchema = new Schema({

    name: {type:String,required:true,unique:false},
    phone: {
            type:String,
            unique:true,
            validate: {
              validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
              },
              message: '{VALUE} is not a valid phone number!'
            }
          }

    
  });


  // Create a model for the schema
const User = mongoose.model('User', UserSchema);
module.exports = User;
