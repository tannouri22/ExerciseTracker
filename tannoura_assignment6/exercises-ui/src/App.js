import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import { useState } from 'react';
import Navigation from './components/nav';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>

      <header>
          <h1> Exercise Tracker </h1>
          <p> This application allows you to track any exercise you've done on any given day. Simply
            click the "add an exercise" button to get started! 
          </p>
      </header>

      <Navigation/>

      <main>
          <Route path="/" exact>
            <HomePage setExerciseToEdit={setExerciseToEdit} />
          </Route>
          <Route path="/add-exercise">
            <CreateExercisePage />
          </Route>
          <Route path="/edit-exercise">
            <EditExercisePage exerciseToEdit={exerciseToEdit} />
          </Route>
      </main>

      <footer>
          <p>&copy; August Tannouri 2022.</p>
      </footer>

      </Router>
    </div>
  );
}

export default App;