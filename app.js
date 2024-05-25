const express = require("express");
const app = express();
const ejsMate = require("ejs-mate");
const path = require('path'); 
const mongoose = require("mongoose");
const lists = require("./models/mongo.js");

mongoose.connect('mongodb://127.0.0.1:27017/project');

app.set ("view engine", "ejs");
app.use (express.json());
app.use (express.urlencoded({extended:true}));
app.use (express.static(path.join(__dirname,"public")));
app.engine("ejs",ejsMate); 

app.get("/",async function (req,res){
    const data = await lists.find({});
    res.render("index",{data});
});

app.get("/view/:id",async (req,res)=>{
    const id = req.params.id;
    const idvalue = await lists.findOne({_id: id});
    res.render("view",{idvalue});
});

app.get("/delete/:id",async (req,res)=>{
    const id = req.params.id;
    await lists.findOneAndDelete({_id: id},{new:true}).then((err)=>{console.log(err)});
    res.redirect("/");
});

app.get("/edit/:id",async (req,res)=>{
    const id = req.params.id;
    const idvalue = await lists.findOne({_id: id});
    res.render("edit",{idvalue});
});

app.post("/edit/:id",async (req,res)=>{
    const id = req.params.id;
    const {title, description, filename, url, price, location, country } = req.body;
    const idvalue = await lists.findOneAndUpdate({_id: id},{title:title, description:description, image: {
        filename : filename,
        url: url
        }, 
        price:price,
        location:location, 
        country:country 
    });
    res.redirect(`/view/${id}`);
});

app.get("/create", (req,res)=>{
    res.render("create");
});

app.post("/create", async (req,res)=>{
    const {title, description, filename, url, price, location, country } = req.body;
    let newlist = await lists.create({
        title,
        description,
        image: {
            filename : filename,
            url: url
           },
        price,
        location,
        country
    });
    let id = newlist.id;
    res.redirect(`/view/${id}`);
});

app.listen(3000,()=>{
    console.log("Server running...");
});
