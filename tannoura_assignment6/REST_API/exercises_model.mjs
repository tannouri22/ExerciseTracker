// Get the mongoose object
import mongoose from 'mongoose';

// Prepare to the database movies_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises_db",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Connect to to the database
const db = mongoose.connection;
// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

/**
 * Define the schema
 */
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    reps: { type: Number, required: true },
    weight : { type: Number, required: true },
    unit : { type: String, required: true }
});

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema);

//createExercise()
/**
 * Create an exercise
 * @param {String} name
 * @param {String} date
 * @param {Number} reps
 * @param {Number} weight
 * @param {String} unit
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
 const createExercise = async (name, date, reps, weight, unit) => {
    // Call the constructor to create an instance of the model class Movie
    const exercise = new Exercise({ name: name, date: date, reps: reps, weight: weight, unit: unit });
    // Call save to persist this object as a document in MongoDB
    return exercise.save();
}

//findExerciseById
/**
 * Retrieves the exercise based on the filter, which is the _id passed
 * @param {Object} filter 
 * @param {String} projection (not specified)
 * @param {Number} limit (not specified)
 * @returns 
 */
 const findExerciseById = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

//findExercises
/**
 * Retrieves all the exercises, since the filter passed is empty
 * @param {Object} filter 
 * @param {String} projection (not specified)
 * @param {Number} limit (not specified)
 * @returns 
 */
 const findExercises = async (filter) => {
    const query = Exercise.find(filter);
    return query.exec();
}

/**
 * 
 * @param {Object} obj 
 * @returns a boolean value denoting whether a JSON object is empty or not
 */
 function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

//replaceExercise
/**
 * updates an exercise in the database
 * MUST ENSURE THAT THE OTHER PROPERTIES ARE RETURNED AS WELL, INTACT !!!!
 * @param {Object} conditions (an object containing a user's _id)
 * @param {Object} update (the parameters entered by the user in the query that they want to update)
 * @param {Number} options (None) 
 * @returns A promise. Resolves to the number of documents modified
 */
 const replaceExercise = async (_id, name, date, reps, weight, unit) => { 
    const conditions = {_id: _id};
    const update = { _id: _id, name: name, date: date, reps: reps, weight: weight, unit: unit };
    const result = await Exercise.findOneAndUpdate(conditions, update)
    if (isEmpty(conditions)){
        return 0;
    }
    else {
        return 1;
    }
}

//deleteById
/**
 * Delete the exercise with given the _id
 * @param {Object} input (represents all the parameters entered in the query)
 * @returns A promise. Resolves to the count of deleted documents
 */
 const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}

export { deleteById, replaceExercise, findExercises, findExerciseById, createExercise};
