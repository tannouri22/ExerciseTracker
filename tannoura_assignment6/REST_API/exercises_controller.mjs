import * as exercises from './exercises_model.mjs';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new exercise with the name, reps, date, unit and weight provided in the body
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.date, req.body.reps, req.body.weight, req.body.unit)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: "Request failed: cannot create exercise"});
        });
});


/**
 * Retrive the exercise corresponding to the ID provided in the URL.
 */
app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id;
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.status(200).json(exercise);
            } else {
                res.status(404).json({ Error: "Exercise not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: "Cannot find exercise" });
        });
});

/**
 * Retrieve exercises.
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    exercises.findExercises(filter, "", 0)
        .then(exercises => {
            res.status(200).json(exercises);
            //res.send(exercises);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: "Request failed: cannot find exercises" });
        });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its name, reps, units, date and weight to the values provided in the body.
 */
app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.date, req.body.reps, req.body.weight, req.body.unit)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, date: req.body.date, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit })
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: "Request failed: cannot update exercise" });
        });
});

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: "Resource not found" });
            }
        })    
        .catch(error => {
            console.error(error);
            res.status(500).json({ Error: "Request failed: cannot delete exercise" });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});