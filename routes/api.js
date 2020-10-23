const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
    Workout.create({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(params.id, { $push: { exercises: body}},
        //"runValidators" will ensure new exercises meet our schema requirements
        { new: true, runValidators: true})
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", ({ query }, res) => {
    Workout.find().limit(7)
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(400).json(err);
        });
});

router.delete("/api/workouts", ({ body }, res) => {
    Workout.findByIdAndDelete(body.id)
        .then(() => {
            res.json(data);
        }).catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;