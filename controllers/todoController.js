const mongo = require("mongoose");

//establish the connection with mongoDB
mongo.connect("mongodb://localhost:27017/todos",{ useNewUrlParser: true });


//set the model of the collection 
var schema = new mongo.Schema({
    item: String
});

//instantiate  the collection to manipulate 
var Todo = mongo.model("Todo",schema);

module.exports = (app,body)=>{

    //default page 
    app.get("/",(req,res)=>{
        res.render("form");
    });

    //for display the data in the database 
    app.get("/list",(req,res)=>{
        Todo.find({},(err,data)=>{
            if(err) throw err;
            res.render("list",{donnees:data});
        })
    });

    // for adding the todo 
    app.post("/addTodo",body,(req,res)=>{
        Todo({item:req.body.work}).save((err)=>{
            if(err) throw err;
            //redirection 
            res.redirect("/list");
        })
    });

    //for the delete the todo
    app.get("/del/:id",(req,res)=>{
        var myqr = {_id:req.params.id};
        Todo.remove(myqr,(err,obj)=>{
            if(err) throw err;
                res.redirect("/list");
        })
    });

  
}