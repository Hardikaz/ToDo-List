// const myHero=require('superheroes');

// var name=myHero();
// console.log(name);


const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
//const date=require(__dirname+"/date.js");
const mongoose=require('mongoose');


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

//Connecting to mongoose
mongoose.connect("mongodb://localhost:27017/todolistDB2",{useNewUrlParser:true})

const itemsSchema={
    name:String
};

const Item=mongoose.model("Item",itemsSchema);

const item1=new Item({
    name:"Welcome to the todo List"
})

const item2=new Item({
    name:"Hit the + button to add a new line"
})

const item3=new Item({
    name:"<-- Hit this to delet an item"
})

const defaultItems=[item1,item2,item3];
const result=[];
const listSchema={
    name:String,
    items:[itemsSchema]
};

const List=mongoose.model("List",listSchema);

//app.get("/",function(req,res){
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
    
   // let day = date.getonlyDay();
    // res.render('list',{workList:"Today",newItem:items});
    // console.log(Item.find({}))
    // res.render('list',{workList:"Today",newItem:Item.find({}).getFilter()});
    
    app.get("/",function(req,res){
        if(result.length===0)
        {
            Item.insertMany(defaultItems);
            console.log("Hello")   
               
            Item.find({}).exec().then(data=>{data.forEach(data=>{result.push(data)})});
            
            res.render('list',{workList:"Today",newItem:result}); // Render a view named 'items' with the retrieved items
        //   catch (error) {
        //     console.error(error);
        //     res.status(500).send('Internal Server Error');
         
          }
          else{
            res.render('list',{workList:"Today",newItem:result});
          }
        
        
})

app.post("/",function(req,res){
 const  itemName=req.body.inputValue;

 const item=new Item({
    name: itemName
 });

 item.save();
 console.log(itemName)
result.push(itemName);
 res.redirect("/");
// console.log(req.body);
//  if(req.body.list==="Work-List"){
//     newItems.push(item);
//     res.redirect("/work");
//  }

//  else{
//    items.push(item);
//    res.redirect("/");
//  }


//  items.push(item);
//     res.redirect("/");
});

app.get("/:customListName",function(req,res){
const customListName=req.params.customListName;

List.findOne({name:"customListName"}).exec().then(result=>{console.log("Exists")}).catch(error=>{
console.log("Doesn't exists")
})

const list=new List({
    name:customListName,
    items:defaultItems
});

//list.save()
})

app.post("/delete",function(req,res){
    const checkedItemdId=req.body.checkbox;
    Item.findByIdAndRemove(checkedItemdId).exec().then(data=>
        {console.log("Data deleted");
        result.pop();
        console.log(result.length);
        res.redirect("/");
        
    }).catch(err=>{console.log(err)});
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
