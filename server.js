const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/stats', (req, res) => res.sendFile(path.join(__dirname, '/public/stats.html')));
app.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, '/public/exercise.html')));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts", {
//   useNewUrlParser: true
// //   ,
// //   useFindAndModify: false
// });


mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workouts',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  );

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


