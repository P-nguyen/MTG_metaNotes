import React from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';

const App = () => (
    <div>
        <div className="app">
            <img src={logo} className="logo rotate"/>
            <h1>Welcome MTG DECK BUILDER</h1>
        </div>
    </div>
);

export default App;
