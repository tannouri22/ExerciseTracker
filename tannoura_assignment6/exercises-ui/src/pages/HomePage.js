import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const history = useHistory();

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        if (response.status === 204){
            setExercises(exercises.filter(x => x._id !== _id));
        } else {
            console.error(`Failed to delete exercise with _id = ${_id} with status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const exercises = await response.json();
        if (response.status === 200){
            setExercises(exercises);
        } else {
            console.error('Failed to load exercises.'); 
        }
        
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <br></br>
            <Link to="/add-exercise" className="table-button">Add an exercise</Link>
        </>
    );
}

export default HomePage;

//displays the data by calling the GET endpoint
//displays all 5 properties in the table, NOT ID!!!!
//must use two icons from the react library for delete and update
//a link or icon that allows the user to navigate to the create exericse pages