const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser:true});

const itemSchema = {
    name: String
}

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "first"
})

const item2 = new Item({
    name: "Second"
})

const item3 = new Item({
    name: "Third"
})

var defaultItems = [item1, item2, item3];



app.get("/", (req,res) => {
    const name = "abhishek";
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    
    Item.find({}, (err, foundItems) => {

        if(foundItems.length === 0){
            Item.insertMany(defaultItems, (err) => {
                if(err){
                    console.log(err);
                } else{
                    console.log("Default items saved in DB successfully.")
                }
            })
            res.redirect("/");
        }else{
            res.render('list', {name: name, date: date, items: foundItems});
        }

        
    });
    
})

app.post("/", (req,res) => {

    item = req.body.item;
    items.push(item);
    res.redirect("/");

})

const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server started on port "+ PORT);
});