const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

var items = [];
var item;
app.get("/", (req,res) => {
    const name = "abhishek";
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    
    res.render('list', {name: name, date: date, items: items});
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