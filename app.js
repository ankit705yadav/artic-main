const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const { CLIENT_RENEG_LIMIT } = require("tls");

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
    extended:true
}));

mongoose.connect("mongodb://0.0.0.0:27017/userDB",{useNewUrlParser:true});

const userSchema = {
    email:String,
    password:String
}

const User = new mongoose.model("user",userSchema);

// app.get("/",function(req,res){
//     res.render("index")
// })

app.post("/login",function(req,res){
    const username = req.body.username
    const password = req.body.password

    User.findOne({email: username},function(err,foundUser){
        if(err){
            console.log(err)
        }else{
            if(foundUser){
                if(foundUser.password === password){
                    res.render("./index")
                }
            }
        }
    });
});



app.post("/register",function(req,res){
    const newUser = new User({
        email:req.body.username,
        password:req.body.password  
    });
    newUser.save(function(err){
        if(err){
            console.log(err)
        }else{
            res.render("secrets");
        }
    });
});