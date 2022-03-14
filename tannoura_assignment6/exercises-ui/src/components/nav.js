import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return(
        <>
        <nav id='elements'>
        <Link to="/" exact className='App-link'>Home</Link>
        <Link to="/add-exercise" className="App-link">Create Exercise</Link>
        </nav>
        </>
    );
}

export default Navigation;