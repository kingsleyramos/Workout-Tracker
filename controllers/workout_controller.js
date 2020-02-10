const db = require("../models");
const mongojs = require("mongojs");

// Gets all Workouts
exports.getAll = function (req, res){
    //console.log(req.user.username);

    db.User.findOne({ username: req.user.username})
    .populate("workouts")
    .then(dbUser => {
      res.json(dbUser.workouts);
    })
    .catch(err => {
      res.json(err);
    });
};

// returns only one workout
exports.getOne = function (req, res){
    db.Workout.findOne({
        _id: mongojs.ObjectId(req.params.id)
    })
    .then(workout =>{
      res.json(workout);
    })
    .catch(({err}) => {
      console.log(err);
    });
};

// edits one workout
exports.editOne = function (req, res){
    db.Workout.update({
        _id:mongojs.ObjectId(req.params.id)
    }, {
        $set: req.body
    }).then(data =>{
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
};

// adds one workout
exports.addOne = function ({ body }, res) {

    db.Workout.create(body)
    .then(({ _id }) => 
        db.User.findOneAndUpdate({}, { $push: { workouts: _id } }, { new: true }))
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });

}

//deletes workout
exports.deleteOne = function (req, res) {
    db.Workout.remove({
        _id:mongojs.ObjectId(req.params.id)
    }).then(data =>{
        res.json(data);
    }).catch(err => {
        res.json(err);
    });
};