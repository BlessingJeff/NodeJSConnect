const express = require("express");
const app = express();
const cors = require("cors");
let usersList = []
app.use (express.json())

app.use(cors({
    origin : '*'
}))
 
app.get("/users", function(req, res){
    res.json(usersList)
});

app.get("/user/:id", function(req, res){
    let user = usersList.find(obj => obj.id == req.params.id);
    if (user) {
        res.json(user)
    } else {
        res.status(404).json({message: "User Not Found"});
        }
})

app.post("/create-user", function(req, res){
    req.body.id = usersList.length+1
    usersList.push(req.body);
    res.json({message : "User Added!"});  
});

app.put("/user/:id", function(req, res){
    let index = usersList.findIndex(obj =>obj.id == req.params.id);
let keyArray = Object.keys(req.body);
keyArray.forEach((obj) => {
    usersList[index][obj] = req.body[obj]
})
res.json({message : "Edited"});
})

app.delete("/user/:id", function (req, res){
    let index = usersList.findIndex(obj =>obj.id == req.params.id);
    usersList.splice(index, 1);
    res.json({message:"Deleted!"})
});
app.listen(3000);