// const myHero=require('superheroes');

// var name=myHero();
// console.log(name);


const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const date=require(__dirname+"/date.js");

// console.log(date());
// console.log(date.getonlyDay());
// console.log(date.getDay());
const app=express();
let items=[];
let work="Work-List";
let newItems=[];
app.use(bodyParser.urlencoded({extended:true}));
// app.use("/public",express.static("C:\\Users\\Hardik Sharma\\Desktop\\Files\\Node Work\\Node Prac"));

app.use('/public' , express.static(path.join(__dirname, 'public')))
app.set('view engine','ejs');


app.get("/",function(req,res){
    // // res.write("Kya bhai khafa ho kya");//to send multiple statements
    // // res.write("Server aithan dikha rha hai kya");
    // res.sendFile(__dirname+"/index.html");
    // // res.send();//it is used as final statement;

    // var date=new Date();
    // var day=date.getDay();
    // console.log(day);
    // res.send(new Date().getDay());

    // var date=new Date();
    // let day=date.getDay();
    // var d="";
    // if(day==6 || day==7)
    // {
    //     d="Weekend";
    // }
    // else{
    //     d="Weekday";
    // }
    // switch(day)
    // {
    //     case 1:
            
    //         d="Monday";
    //         break;
            
    //     case 2:
            
    //         d="Tuesday";
    //         break;
            
    //     case 3:
            
    //         d="Wednesday";
    //         break;
            
    //     case 4:
            
    //         d="Thursday";
    //         break;
            
    //     case 5:
            
    //         d="Friday";
    //         break;
            
    //     case 6:
            
    //         d="Saturday";
    //         break;
            
    //     case 7:
            
    //         d="Sunday";
    //         break;
            
    //     // default:
    //     //         d="Bhak bc";
    // }

//     var date=new Date();
//      var formatDate=date.toLocaleString("en-US",{
//   day: "numeric",
//   month: "short",
//   year: "numeric",
//   hour: "numeric",
//   minute: "2-digit"
    //  });
    
    let day = date.getonlyDay();
    res.render('list',{workList:day,newItem:items});
})

app.post("/",function(req,res){
 let item=req.body.inputValue;
console.log(req.body);
 if(req.body.list==="Work-List"){
    newItems.push(item);
    res.redirect("/work");
 }

 else{
   items.push(item);
   res.redirect("/");
 }


//  items.push(item);
//     res.redirect("/");
})

app.get("/work",function(req,res){
    res.render('list',{workList:work,newItem:newItems})
})

app.post("/work",function(req,res){
   
  
   res.redirect("/work")
})

app.get("/about",function(req,res){
    res.render("about");
})

app.post("/about",function(req,res){
    res.redirect("/about");
})



app.listen(3000,function(){
    console.log("Listening on server 3000");
})