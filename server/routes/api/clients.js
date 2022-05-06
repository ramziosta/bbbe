const express = require('express');
const router = express.Router();
const path = require('path');

const data = {}

data.clients = require('../../data/clients.json');


router.route('/')
    .get((req,res) => {
        res.json(data.clients);
    })
    .post((req,res)=>{
      res.json({
          "email": req.body.email, 
          "password": req.body.password
        });
    })
    .put((req,res)=>{
        res.json({
            "email": req.body.email, 
            "password": req.body.password
          })
    })
    .delete((req,res)=>{
        res.json({
            "email": req.body.email, 
          })
    });

    router.route('/:email')
    .get((req,res) => {
        res.json({"email": req.params.email});
    })

    module.exports = router;