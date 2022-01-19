const express = require('express');
const bodyParser = require('body-parser');
var methodOverride = require('method-override')
const mongoose = require('mongoose'); 
const users = require('./models/users');
mongoose.connect('mongodb://localhost:27017/assign4');
const app = express();



app.use(bodyParser());
app.use(express.static("public"));
app.use(methodOverride('_method'))

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req,res)=>{
    var userData = await users.find()
    res.render('home',{userData});
});

app.get("/form",(req,res)=>{
    res.render('form');
});

app.post('/user/add',async (req, res)=>{
    // console.log(req.body)
    try{
        await users.create({
            name: req.body.name,
            email: req.body.email,
            isPromoted:null
        })
    }
    catch(err){
        console.log(err);
    }
    
    res.redirect('/')
})

app.put("/users/:id", async(req, res)=>{
    const idval = req.params.id
    const user = await users.find({_id: idval})
    // console.log(user)
    if (user[0].isPromoted === null || user[0].isPromoted === false){
        await users.updateOne({_id:idval},{isPromoted:true})
    }
    else{
        await users.updateOne({_id:idval},{isPromoted:false})
    }
    res.redirect('/')
})

app.delete("/users/:id",async(req,res)=>{
    await users.deleteOne({_id:req.params.id});
    res.redirect('/')
})

port = 3010;
app.listen(port,()=>{
    console.log(`Server Started at ${port}`);
});