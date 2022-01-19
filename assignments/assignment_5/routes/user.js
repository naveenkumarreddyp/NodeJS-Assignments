const express = require('express');
const bodyparser = require("body-parser");
const router = express.Router();
const { body, validationResult } = require('express-validator'); 


router.use(bodyparser());
const User = require("../models/users");

// ----------Creating User --------------
router.post('/',body('email').isEmail(), body("name").isAlpha(), async (req,res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array() 
            });
        }
        console.log(req.body);
        const user = await User.create(req.body);
        res.json({
        status:"Sucess",
        data : user
    })
    }
    catch(err){
        res.status(500).json({
            status:"Failed",
            message:err.message
        })
    }
});
// ----------- Fetching Users  ----------------

router.get('/',async (req,res)=>{
    try{
        const users = await User.find();
        res.json({
        status:"Sucess",
        data : users
    })
    }
    catch(err){
        res.status(500).json({
            status:"Failed",
            message:err.message
        })
    }
});

// ------------ Fetching USer By ID -------------

router.get('/:id',async (req,res)=>{
    try{
        const user = await User.find({_id: req.params.id});
        res.json({
        status:"Sucess",
        data : user
    })
    }
    catch(err){
        res.status(500).json({
            status:"Failed",
            message:err.message
        })
    }
});
// ------------- Update User data By finding With ID ---------------

router.put('/:id',async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate({_id: req.params.id},req.body,{new:true});
        res.json({
        status:"Sucess",
        data : user
    })
    }
    catch(err){
        res.status(500).json({
            status:"Failed",
            message:err.message
        })
    }
});

//// ------------- Delete User --------------

router.delete('/:id',async (req,res)=>{
    try{
        const user = await User.deleteOne({_id: req.params.id});
        res.json({
        status:"Sucess",
        data : user
    })
    }
    catch(err){
        res.status(500).json({
            status:"Failed",
            message:err.message
        })
    }
});

module.exports = router;