const express = require('express');
const User = require("../services/user.js");

const router = express.Router();


router.get("/", function(req,res){

    try {

        // get all the tasks
        User.getAll(req).then((users) =>{

            res.send({"result":users,"error":false});

        }).catch((err)=>{

            res.status(500).send({"result":err,"error":true});       

        });


    } catch(err) {

        res.status(500).send({"result":"Server Error! Please try again later","error":true});  
    }

});

module.exports = router;


