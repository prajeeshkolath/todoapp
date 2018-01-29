const express = require('express');
const Task = require("../services/task.js");

const router = express.Router();


router.get("/", function(req,res){
 
    // get all the tasks
    try {

        Task.getAll(req).then((tasks) =>{

            res.send({"result":tasks,"error":false});
    
        }).catch((err)=>{
    
            res.status(500).send({"result":err,"error":true});      
    
        });
        
    } catch(err) {

        res.status(500).send({"result":"Server Error! Please try again later","error":true});  
    }

    



});

router.get("/:taskId", function(req,res){
 
    // get task details
    try {
        Task.getTaskDetails(req.params.taskId).then((task) =>{

            res.send({"result":task,"error":false});

        }).catch((err)=>{

            res.status(500).send({"result":err,"error":true});      

        });

    } catch(err) {

        res.status(500).send({"result":"Server Error! Please try again later","error":true});  
    }



});


router.post("/", function(req,res){
    
    try {
        // create a new task
        Task.create(req.body).then((tasks) =>{

            res.send({"result":tasks,"error":false});

        }).catch((err)=>{

            res.status(500).send({"result":err,"error":true});      

        });
    } catch(err) {

        res.status(500).send({"result":"Server Error! Please try again later","error":true});  
    }


});

router.put("/:taskId", function(req,res){
 
    try {
        // update a task
        Task.update(req.body,req.params.taskId).then((tasks) =>{

            res.send({"result":tasks,"error":false});

        }).catch((err)=>{

            res.status(500).send({"result":err,"error":true});      

        });
    } catch(err) {

        res.status(500).send({"result":"Server Error! Please try again later","error":true});  
    }

});

router.delete("/:taskId", function(req,res){
 
    try {
        // delete a task
        Task.delete(req.params.taskId).then((tasks) =>{

            res.send({"result":tasks,"error":false});

        }).catch((err)=>{

            res.status(500).send({"result":err,"error":true});        

        });
    } catch(err) {

        res.status(500).send({"result":"Server Error! Please try again later","error":true});  
    }

});

module.exports = router;