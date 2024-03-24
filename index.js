const express = require("express");
const path = require('path');
const signinrouter = require("./routes/signin.js"); // Import the router directly
const { connect } = require("./connect.js");
connect("mongodb://127.0.0.1:27017/accounts").then(() => console.log("mongodb is connected"));
const signuprouter = require("./routes/signup.js");
const {Data , Book} = require("./models/data.js");
const app = express();
const PORT = 80; 
let list =["Fictional","Health","Mystery","Thriller","History","CS"];
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static("views"));

app.get("/",async(req,res)=>
{
    let result=[];
    for(values in list)
    {
        let results_book=await Book.find({subject:list[values]}).limit(5);
          
        result.push(results_book);

    }
    return res.render("home",{result : result , list : list });
});
app.use("/signin", signinrouter); // Use the router directly
app.use("/signup", signuprouter);
app.post("/signup", async (req, res) => {
    const id = req.body;
    if (id.gmail && id.password) {
        const user = await Data.findOne({ gmail: id.gmail });

        if (!user) {
            const result1 = await Data.create({ gmail: id.gmail, password: id.password ,cat : "c"});
            let result=[];
            for(values in list)
            {
                let results_book=await Book.find({subject:list[values]}).limit(5);
                   
                result.push(results_book);
        
            }
            return res.render("home", { create: id.gmail ,list :list ,result :result }); // Pass local to template
        }

        return res.render("signup",{same :"ok"});
    }
});
app.post("/signin", async (req, res) => {
    const id = req.body;
    if (id.gmail && id.password) {
        const user = await Data.findOne({ gmail: id.gmail });

        if (user) {
             if(id.password === user.password){
                if(user.cat === "c"){
                    let result=[];
                    for(values in list)
                    {
                        let results_book=await Book.find({subject:list[values]}).limit(5);
                          
                        result.push(results_book);
                
                    }
                return res.render("home", { create: id.gmail ,result :result ,list :list}); 
                }
                if(user.cat === "o"){
                    return res.redirect("/owner");   
                }
                if(user.cat === "e"){
                    return res.render("employ", { create: id.gmail });   
                }
             }
            return res.render("signin", { same :"no" }); // Pass local to template
        }

        return res.render("signin",{same :"ok"});
    }
});

app.get("/owner",async(req,res)=>
 {     console.log("not ok");
     
    return res.render("owner")
});
app.post("/owner",async (req,res)=>
{ 
    const id = req.body;
    if (id.gmail && id.password) {
        const user = await Data.findOne({ gmail: id.gmail });

        if (!user) {
            const result = await Data.create({ gmail: id.gmail, password: id.password ,cat : "e"});
            console.log(result);
            return res.redirect("/owner") 
        }  
    } 
    if(id.gmail1){
        const user = await Data.findOneAndDelete({ gmail: id.gmail1 });
        return res.redirect("/owner") ;
    } 
    if(id.book)
    {
        
    }
});
app.get("/allbooks",async(req,res)=>
 {    const subject = req.query.subject;
       console.log(subject);
        let  result=await Book.find({subject:subject});
          
      console.log(result);

    return res.render("allbooks",{subject : subject , result :result})
});
app.get("/singlebook",async (req,res)=>
{   
    const book = req.query.book;
     console.log(book);
});


app.listen(PORT, () => console.log("server started"));