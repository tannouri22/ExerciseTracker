import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditExercisePage = ( { exerciseToEdit }) => {

    const [name, setName] = useState(`${exerciseToEdit.name}`);
    const [weight, setWeight] = useState(`${exerciseToEdit.weight}`);
    const [date, setDate] = useState(`${exerciseToEdit.date}`);
    const [unit, setUnit] = useState(`${exerciseToEdit.unit}`);
    const [reps, setReps] = useState(`${exerciseToEdit.reps}`);

    const history = useHistory();

    const editExercise = async () => {
        const editedExercise = {name, weight, reps, date, unit};
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200){
            alert('Exercise was successfully edited!')
        } else {
            alert(`Failed to edit the exercise`)
        }
        history.push("/");
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <select 
                value={unit}
                onChange={e => setUnit(e.target.value)}>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
            </select>
            <input
                type="text"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <input
                type="text"
                value={reps}
                onChange={e => setReps(e.target.value)} />
            <button
                onClick={editExercise}
            >Save</button>
        </div>
    );
}

export default EditExercisePage;

//the controls must be prepopulated with the values of the exercise