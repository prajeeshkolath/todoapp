const mongoose = require("../config/connection.js");
//const User = require("./User.js");
const Schema = mongoose.Schema;

// Create the schema for the Account database
const TaskSchema = new Schema({
    task_name: {type:String,required:true,unique:false},
    assigned_user:{type: mongoose.Schema.Types.ObjectId,
      ref: 'User',required:false},
    assigned_user_name: {type:String,required:false},
    created_by_user: {type: mongoose.Schema.Types.ObjectId,
      ref: 'User',required:true},
    created_by_user_name:{type:String,required:true},
    last_updated_on: { type: Date, required: true, unique: false },
    created_on: { type: Date, required: true, unique: false },
    due_by: { type: Date, required: false, unique: false }

});


  // Create a model for the schema
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;