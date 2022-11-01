const express = require("express")
const bodyParser = require("body-parser")
const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs"); // this is to tell our app to use ejs
app.use(bodyParser.urlencoded({ extended: true })); // to all the app to use body parser and post
app.use(express.static("public"))
app.get("/", function(req, res) { // this is our call bak function  

    let today = new Date();


    //this is for date
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-Us", options);


    res.render("list", { listTitle: day, newListItems: items }); //here we call our template we created of ejs and it put its variable 
    //so we use a switch statment.

});
app.post("/", function(req, res) {
    //here we create this post function to recognize the text from our html to be able to add it to our server

    let item = req.body.newItem; // so here we tap into the request, search into the body of the post item and then look for the value called new item

    if (req.body.list === "work") { //here we put the list to pick up the name from our button in our ejs file
        workItems.push(item); // here we push our text into our array of workitems
        res.redirect("/work"); //THIS IS FOR THE WORK PAGE TODOLIST or the work route

    } else {
        items.push(item);
        res.redirect("/"); //this one redirects to our home route

    }


})
app.get("/work", function(req, res) {
    res.render("list", { listTitle: "work List", newListItems: workItems }); // then it erenders the items in the array of the workItems

})
app.post("/work", function(req, res) {
    let item = req.body.newItem;
    res.redirect("/work");

});

app.get("/about", function(req, res) {
    res.render("about")
})

app.listen(3000, function() {
    console.log("server started on port 3000 is up and running");
});