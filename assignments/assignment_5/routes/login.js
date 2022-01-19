const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.use(express.json());
const secret = "restapi"

router.post("/register", body("email"),body("password"), async (req,res)=>{
    // console.log(req.body)
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array() 
            });
        }
        const { name, email, password } = req.body;
        bcrypt.hash(password, 10, async function (err, hash) {
            try{
                if(err){
                    console.log(err);
                    return res.status(400).json({
                        status:"Failed",
                        message:"Invalid Data"
                    });
                }else{
                    const user = await User.create({
                        name,
                        email,
                        password: hash
                    });
                    return res.status(200).json({
                        status: "success",
                        data: user
                    });
                }
            }catch(err){
                res.status(400).json({
                    status:"Failed",
                    message:err.message
                })

            }
            
        });
    }
    catch(err){
        res.status(400).json({
            status:"Failed",
            message: err.message
        })
    }   
});

router.post("/login", body("email"), body("password"), async (req,res)=>{
    try{
        console.log(req.body);
        const{email, password} = req.body;
        const user = await User.findOne({email})
        console.log(user)
        bcrypt.compare(password, user.password, async function(err, result){
            if(err){
                console.log(err)
                return res.status(400).json({
                    status:"Failed",
                    message:"Invalid Credentials"
                })
            }else{
                const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: user._id
                  }, secret);
                return res.json({
                    status : result? "Login Successful" : "Invalid Login",
                    token : token
                })
            }
        })
    }
    catch(err){
        res.status(400).json({
            status:"failed",
            message : err.message
        })
    }
});

module.exports = router;