const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");
const auth = require("../middleware/auth");

router.post("/", auth, workoutController.addWorkout);
router.get("/", auth, workoutController.getMyWorkouts);
router.get("/:id", auth, workoutController.getWorkoutById);
router.put("/:id", auth, workoutController.updateWorkout);
router.delete("/:id", auth, workoutController.deleteWorkout);
router.patch("/:id/status", auth, workoutController.completeWorkoutStatus);

module.exports = router;