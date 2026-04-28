require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_STRING)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

// [SECTION] Server Listening
if(require.main === module) {
    // http:localhost:4000
    app.listen(process.env.PORT || 3000, () => console.log(`API is now online on port ${process.env.PORT || 3000}`)); 
};

// In creating APIS, exporting modules in the "index.js" can be ommited
module.exports = {app, mongoose};