const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
const { body, validationResult } = require('express-validator'); 
mongoose.connect("mongodb://localhost:27017/users");
const app = express();
app.use(bodyparser());
const secret = "restapi"

const userRoutes = require('./routes/user');
const loginRoutes = require('./routes/login');
const postRoutes = require('./routes/post');
const User = require("./models/users");
const jwt = require('jsonwebtoken');

app.use("/posts", async (req,res,next)=>{
    // console.log(req.headers);
    const token = req.headers.authorization.split("test ")[1];
    if(!token){
        return res.status(200).json({
            status:"Failed",
            message:"Token not Athenticated"
        })
    }
    jwt.verify(token,secret, async function(err, decoded){
        // console.log(err, decoded);
        if(err){
            return res.status(200).json({
                status:"Failed",
                message:"Invalid Token"
            });
        }
        // console.log(decoded)
        const user = await User.findOne({_id: decoded.data});
        req.user = user._id;
        next();
    });
    
});


app.use('/api/v1/users', userRoutes);
app.use('/', loginRoutes);
app.use('/posts', postRoutes);

const port = 3000
app.listen(port,()=>{
    console.log(`Port is Listening at http://localhost:${port}`);
});