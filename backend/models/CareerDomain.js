const mongoose = require("mongoose")

const CareerDomainSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

description:{
type:String
}

})

module.exports = mongoose.model("CareerDomain",CareerDomainSchema)