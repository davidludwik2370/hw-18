const router = require("express").Router();
const Workout = require("../models/workout.js");

// getLastWorkout: /api/workouts
// addExercise: "/api/workouts/" + id
//createWorkout: "/api/workouts"
//getWorkoutsInRange: /api/workouts/range

//add exercise
router.put("/api/workouts/:id", (req, res) => {
  console.log(req.body)
  Workout.updateOne(
    { _id: req.params.id}, 
    { $push: { exercises: req.body } }
  ).then(workoutData => {
    // res.json(workoutData);
    Workout.updateOne(
      { _id: req.params.id}, 
      { $inc: { totalDuration: req.body.duration } }
    ).then(workoutData => {
      res.json(workoutData);
      
    })
    .catch(err => {
      res.status(400).json(err);
    });
  })
  .catch(err => {
    res.status(400).json(err);
  });
});



//create workout
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(workoutData => {
      res.json(workoutData);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//get exercises
// router.get("/api/workouts", (req, res) => {
//   Workout.find({})
//     // .sort({ date: -1 })
//     .then(dbTransaction => {
//       res.json(dbTransaction);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

//get last workout
router.get("/api/workouts", (req, res) => {
  Workout.find().sort({ _id: -1 }).limit(1)
    // .sort({ date: -1 })
    .then(workoutData => {
      res.json(workoutData);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//get range
router.get("/api/workouts/range", (req, res) => {
  Workout.find().sort({ _id: -1 }).limit(7)
    // .sort({ date: -1 })
    .then(workoutData => {
      res.json(workoutData);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});



module.exports = router;
