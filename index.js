const express = require("express");
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(require("body-parser").json());
app.use(cors({
    origin: 'http://localhost'
}));

mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.dam38h3.mongodb.net/gameDB?retryWrites=true&w=majority`
  );

const gameSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    url: String
});

const currentGameSchema = new mongoose.Schema({
    name: String,
    completed: Boolean,
    url: String
});

const Game = mongoose.model("Game", gameSchema);
const currentGame = mongoose.model("currentGame", currentGameSchema);


app.get("/uncompleted-games", (req, res) => {
    Game.find({completed: false}).sort({"name": 1}).exec(
        function(err, games) {
            if (err) {
                console.log(err);
            } else {
            res.json(games)
            }
        });
});

app.get("/completed-games", (req, res) => {
    Game.find({completed: true}).sort({"name": 1}).exec(
        function(err, games) {
            if (err) {
                console.log(err);
            } else {
            res.json(games)
            }
        });
});


app.get("/get-current-game", (req, res) => {
    currentGame.find({
        _id: '63221468bedf342278bc8f56'
    }, (err, game) => {
        if (err) console.log(err);
        else {
            res.json(game);
        }
    });
});

app.put("/update-current-game", (req, res) => {
    currentGame.updateOne(
        {_id: '63221468bedf342278bc8f56'}, 
        {
        "$set" : {
            "name" : req.body.newGame.name,
            "completed": req.body.newGame.completed,
            "url": req.body.newGame.url
        }
        }, 
        (error, result) => {
        if (error) {console.log(error)}
            console.log(result)
    })
})


app.put("/uncomplete", (req, res) => {
    Game.updateOne({
        "name": req.body.newGame.name
    }, {
        "$set": {
            "completed": false
        }
        }, (error) => {
            if (error) {console.log(error)}
        }
    );
});

app.put("/complete", (req, res) => {
    Game.updateOne({
        "name": req.body.name
    }, {
        "$set": {
            "completed": req.body.completed
        }
        }, (error) => {
            if (error) {console.log(error)}
        }
    );
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});