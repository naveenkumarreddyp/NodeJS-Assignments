const express = require('express');
const router = express.Router();
const bodyparser = require("body-parser");
const { body, validationResult } = require('express-validator');
const User = require("../models/users");
const Post = require("../models/posts");
const faker = require("faker");

///---------------- Get All Posts ----------------------

router.get("/", async (req,res)=>{
    try{
        // console.log(req.body)
        const posts = await Post.find()
        // console.log(posts)
        res.status(200).json({
            status:"Sucess",
            data: posts
        });
    }
    catch(err){
        res.send(500).json({
            status:"Failed",
            message:err.message
        });
    }
});

// ---------- Create Post ------------

router.post("/", async (req,res)=>{
    try{
        // console.log(req.body)
        const post = await Post.create({
            title: req.body.title,
            body: req.body.body,
            image: faker.image.image(),
            user: req.user,
        });
        res.status(200).json({
            status:"sucess",
            data: post
        });
    }
    catch(err){
        res.json({
            status:"Failed",
            message:err.message
        });
    }
});

///  --------------- Get Post By ID ------------

router.get("/:id", async (req,res)=>{
    try{
        // console.log(req.body)
        const post = await Post.find({user:req.params.id})
        res.json({
            status:"sucess",
            data: post
        });
    }
    catch(err){
        res.json({
            status:"Failed",
            message:err.message
        });
    }
});

// ------------- Update Post By ID --------------

router.put('/:id',async (req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate({_id: req.params.id},req.body,{new:true});
        res.json({
        status:"Sucess",
        data : post
    })
    }
    catch(err){
        res.status(500).json({
            status:"Failed",
            message:err.message
        })
    }
});

// ----------- Delete Post ---------------
router.delete('/:id',async (req,res)=>{
    try{
        const postId = await Post.deleteOne({_id: req.params.id});
        // console.log(postId[0].user)
        // console.log(req.user)
        res.json({
        status:"Sucess",
        data : postId
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