const express=require("express");
const bodyParser=require("body-parser");
const app=express();
var items=["Eat","Sleep","Code","Repeat"];
var workItems=[];
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
   var today =new Date();
   var options={
    weekday:"long",
    day:"numeric",
    month:"long"
   };
   var day=today.toLocaleDateString("en-US",options);
   res.render("list",{listTitle:day,newListItem:items});


});
app.post("/",function(req,res){
  var item=req.body.newItem;
  if(req.body.list=="Work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
  
  items.push(item);
  res.redirect("/")
  }
});


app.get("/work",function(req,res){
  res.render("list",{listTitle:"Work List",newListItem:workItems});
});


app.listen(3000,function(){
    console.log("server is up");
});