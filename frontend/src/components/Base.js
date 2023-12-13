import React from 'react';
import "./Base.css";
import myImage from './logo.png'; // Path to your image file

function Base() {
    return (
        <div className="Home">
            <header className="Home-header">
                <img src={myImage} alt="Amherst Logo" className="Home-logo" />
                <div className="Home-header-text">
                    <h1>Beneski EML DataHub</h1>
                </div>
            </header>
        </div>
    );
}


export default Base;
