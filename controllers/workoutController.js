const Workout = require("../models/Workout");

exports.addWorkout = async (req, res) => {
    try {
        const { name, duration, status } = req.body;

        const workout = new Workout({
            name,
            duration,
            status,
            userId: req.user.id
        });

        await workout.save();

        res.status(201).json(workout);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getMyWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.id });
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(200).json(workout);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update Workout
exports.updateWorkout = async (req, res) => {
    try {
        const updatedWorkout = await Workout.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            req.body,
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(200).json(updatedWorkout);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Delete Workout
exports.deleteWorkout = async (req, res) => {
    try {
        const deletedWorkout = await Workout.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deletedWorkout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(200).json({ message: "Workout deleted successfully" });
    } catch (err) {
        res.status(500).json(err);
    }
};

// Complete Workout Status
exports.completeWorkoutStatus = async (req, res) => {
    try {
        const workout = await Workout.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id
            },
            { status: "completed" },
            { new: true }
        );

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        res.status(200).json(workout);
    } catch (err) {
        res.status(500).json(err);
    }
};