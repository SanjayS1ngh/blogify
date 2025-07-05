const mongoose=require("mongoose");

const Schema=mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        }
    }
)
const Blog=mongoose.model("Blog",Schema);

module.exports =Blog;