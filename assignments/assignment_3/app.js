const express = require('express')
const app = express()
const path = require('path')

// middleware globally, (this middleware helps to acess data which user entered)
// it ia function that can acess and modify the 'req' and 'res' objectsss
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))

// users object list
const users = [
    {username:'John', useremail: 'john@gmail.com' },
    {username:'Alex', useremail: 'alex@gmail.com' },
    {username:'David', useremail: 'david@gmail.com' },
    {username:'Ronald', useremail: 'ronald@gmail.com' },
]

app.get('/',(req, res)=>{
    res.render('home',{users})
})

app.get('/form.ejs',(req,res)=>{
    res.render('form')
})

app.post('/user/add',(req, res)=>{
    users.push({
        username : req.body.username,
        useremail : req.body.useremail
    })
    res.redirect('/')
})




const port = 3000;
app.listen(port,()=>{
    console.log(`server started at ${port} `)
});