const express=require("express");
const app=express();
let port=8080;
app.set("view engine","ejs");
const path =require("path");
app.set("views", path.join(__dirname,"views"));
app.use(express.static("public"));
app.listen(port,() =>{
    console.log("server is started")
});
app.get("/spotify",(req,res)=>{
    res.render("index.ejs");}
);
