const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema ({
   title: String,
   description : String,
   image: {
    filename : String,
    url: String
   },
   price: Number,
   location : String,
   country: String
})
const list = mongoose.model("list", listingSchema)
module.exports = list;