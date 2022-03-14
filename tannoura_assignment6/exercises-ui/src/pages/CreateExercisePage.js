import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [date, setDate] = useState('');
    const [unit, setUnit] = useState('');
    
    const history = useHistory();

    const CreateExercise = async () => {
        const newExercise = {name, weight, reps, date, unit};
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 201){
            alert('Exercise was successfully created!')
        } else {
            alert('Failed to add the exercise')
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Add an Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                required
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={weight}
                placeholder="Enter weight here"
                required
                onChange={e => setWeight(e.target.value)} />
            <select 
                value={unit}
                onChange={e => setUnit(e.target.value)}>
                <option></option>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input
                type="text"
                placeholder="Enter the date here"
                value={date}
                required
                onChange={e => setDate(e.target.value)} />
            <input
                type="text"
                placeholder="Enter the reps here"
                value={reps}
                required
                onChange={e => setReps(e.target.value)} />
            <button
                onClick={CreateExercise}
            >Add</button>
        </div>
    );
}

export default CreateExercisePage;