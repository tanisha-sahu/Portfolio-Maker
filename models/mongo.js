const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema ({
   name:String, 
   profession:String, 
   headline:String, 
   image:{
      img:String,
      filename:String
   }, 
   mail:String,
   social_url:String,
   linkdin:String,github:String
   ,year1:String
   ,title1:String
   ,desc1:String
   ,year2:String
   ,title2:String
   ,desc2:String
   ,year3:String
   ,title3:String
   ,desc3:String
   ,year4:String
   ,title4:String
   ,desc4:String
   ,year5:String
   ,title5:String
   ,desc5:String
   ,year6:String
   ,title6:String
   ,desc6:String
   ,knw1:String
   ,skill1:String
   ,knw2:String
   ,skill2:String
   ,knw3:String
   ,skill3:String
   ,knw4:String
   ,skill4:String
   ,knw5:String
   ,skill5:String
   ,knw6:String
   ,skill6:String
   ,
   owner:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:"user"
      }
   ]
})

const list = mongoose.model("list", portfolioSchema)
module.exports = list;
