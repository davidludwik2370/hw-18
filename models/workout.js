const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: {
    type: Array
  },
  totalDuration: {
    type: Number,
    default: 0
  },
});

workoutSchema.methods.calcTotalDuration = function() {
  for(i=0; i<exercises.length; i++){
    this.totalDuration += parseInt(this.exercises[i].duration);
  }
  return this.totalDuration;
};

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
