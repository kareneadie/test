
const express = require('express');
const app = express();
const port = 3000;
const date = require(__dirname + "/date.js");
var parser = require('body-parser');
const mongoose = require('mongoose');
const url = "mongodb+srv://kareneadie:ke4ss11611@cluster0-vmqgs.mongodb.net/newdb";
mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true});

app.use(parser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const itemsSchema = new mongoose.Schema({
  name : String
});

const Item = mongoose.model('Item', itemsSchema);


const item1 = new Item({
  name : "Going market on Saturday"
})

const defaultItems = [item1];


app.get('/', function(req, res){
  Item.find({}, function(err, foundItems){
    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err){
          console.log(err);
        }
        else {
          console.log("Successfully written default values");
        }
      });
      res.redirect('/');
    }
    else{
        res.render('index', {listTitle: date.getDate(), newListItems : foundItems});
    }
  });
});

app.post('/delete', function(req,res){
  var checkedItemId = request.body.checkbox;
  //modal.findByIdAndRemove();

  Item.findByIdAndRemove(checkedItemId, function(err){
    if (!err) {
      console.log("Successfully delete the item");
      res.redirect('/');
    }
  });
})



//// IDEA this is the bit for the post route

app.post('/', function(req, res){
  const itemName = req.body.newItem;
  const item = new Item({
    name : itemName
  });
  item.save();
  res.redirect('/');
});


app.get('/view', function(req, res){
  res.send(date.getDate());
})
app.listen(port, function(req, res){
  console.log("Server is up and running on port no " + port);
})
