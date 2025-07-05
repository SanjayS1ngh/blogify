const express=require("express");
const app=express();
const port=8000;
const path=require("path");
const mongoose=require("mongoose")
const Blog=require("./models/blog")
mongoose.connect("mongodb://localhost:27017/blogify")
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.set('view engine','ejs');
app.set("views",path.resolve("./views"));

app.get('/blog/add-new',(req,res)=>{
    res.render("addBlog",{
        
    })
})

app.post("/blog/submit",async (req,res)=>{
    await Blog.create(req.body)
    return res.redirect("/")
})
app.listen(8000,()=>{
    console.log("server is listening at port",port);
})

app.get("/",async(req,res)=>{
     const allBlogs=await Blog.find({});
     console.log(allBlogs)
     res.render("home",{allBlogs});

}) 
app.get("/blog/:id",async(req,res)=>{
    const blogId=req.params.id;
    const blog=await Blog.findById(blogId);
    console.log("Blog found in DB:", blog);
    res.render("blogView",{blog})
})
app.post("/blog/delete/:id",async (req,res)=>{
    const blogId=req.params.id;
    const deletedBlog=await Blog.findByIdAndDelete(blogId);
    console.log("deleted blog",deletedBlog)
    res.redirect("/")
})
app.get("/blog/edit/:id",async(req,res)=>{
    const blogId=req.params.id;
    const blog=await Blog.findById(blogId);
    res.render("editBlog",{blog})
})
app.post("/blog/edit/:id",async(req,res)=>{
    const blogId=req.params.id;
    const updatedData=req.body;
    const blog=await Blog.findByIdAndUpdate(blogId,updatedData)
    res.redirect(`/blog/${blogId}`)
})