const express = require("express");
const lists = require("../models/mongo.js");
const {listSchema} = require("../schema.js");
const expError = require("../utils/expError.js");

module.exports.index = (async function (req,res){
    res.render("index");
});

module.exports.view = (async (req,res)=>{
    const id = req.params.id;
    const newlist = await lists.findOne({_id: id}).populate("owner").catch(()=>{throw new expError(404,"Undefined id show")});
    if(!newlist) throw new expError(404,"Undefined id for Show");
    else res.render("portfolio",{newlist}); 
});

module.exports.del = (async (req,res)=>{
    const id = req.params.id;
    const list = await lists.findOne({_id: id});

    if (req.user && list.owner[0]._id.equals(req.user._id)){
    const del = await lists.findOneAndDelete({_id: id},{new:true}).catch(()=>{throw new expError(404,"Undefined id for Delete")});
    }else
    throw new expError(404,"You are not owner");
    req.flash("success","Listing deleted successfully");
    res.redirect("/home/collection");
});

module.exports.editget = (async (req,res)=>{
    const id = req.params.id;
    const idvalue = await lists.findOne({_id: id}).catch(()=>{throw new expError(404,"Undefined id for Edit")});
    if(!idvalue) throw new expError(404,"Undefined id for Edit");
    console.log(idvalue)
    res.render("edit",{idvalue});
})

module.exports.editpost = (async (req,res)=>{
    const id = req.params.id;
    const list = await lists.findOne({_id: id});
    const img = req.file.path;
    const filename = req.file.filename;
    const {name, profession, headline, mail,social_url,linkdin,github,year1,title1,desc1,year2,title2,desc2,year3,title3,desc3,year4,title4,desc4,year5,title5,desc5,year6,title6,desc6,knw1,skill1,knw2,skill2,knw3,skill3,knw4,skill4,knw5,skill5,knw6,skill6} = req.body;
    if (req.user && list.owner[0]._id.equals(req.user._id)){
    const idvalue = await lists.findOneAndUpdate({_id: id},{name, profession, headline, 
        image:{
            filename:filename,
            img:img
        }, mail,social_url,linkdin,github,year1,title1,desc1,year2,title2,desc2,year3,title3,desc3,year4,title4,desc4,year5,title5,desc5,year6,title6,desc6,knw1,skill1,knw2,skill2,knw3,skill3,knw4,skill4,knw5,skill5,knw6,skill6
    });

    }else{
        throw new expError(404,"You are not owner");
    }
    req.flash("success","Listing edited successfully");
    res.redirect(`/home/collection`);

})

module.exports.createget = (req,res)=>{
    res.render("create");
}

module.exports.createpost = ( async (req,res)=>{
    const {name, profession, headline, mail,social_url,linkdin,github,year1,title1,desc1,year2,title2,desc2,year3,title3,desc3,year4,title4,desc4,year5,title5,desc5,year6,title6,desc6,knw1,skill1,knw2,skill2,knw3,skill3,knw4,skill4,knw5,skill5,knw6,skill6} = req.body;
    // let joi = listSchema.validate(req.body);
    // if(joi.error) throw new expError(401,"field required");
    const img = req.file.path;
    const filename = req.file.filename;
    let newlist = await lists.create({
        name, profession, headline, 
        image:{
            filename:filename,
            img:img
        }, mail,social_url,linkdin,github,year1,title1,desc1,year2,title2,desc2,year3,title3,desc3,year4,title4,desc4,year5,title5,desc5,year6,title6,desc6,knw1,skill1,knw2,skill2,knw3,skill3,knw4,skill4,knw5,skill5,knw6,skill6
    });
    newlist.owner.push(req.user);
    await newlist.save();
    let id = newlist._id;
    console.log(newlist);
    req.flash("success","New Listing Created");
    res.redirect(`/home/collection`);
})

module.exports.price = (async function (req,res){
    const data = await lists.find({}).populate("owner");
    console.log(data);
    res.render("creation",{data});
})