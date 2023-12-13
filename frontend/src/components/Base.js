import React from 'react';
import "./Base.css";
import myImage from '/home/gsantosrocha24/Electron-Microscope-Lab-DB/frontend/src/components/logo.png'; // Path to your image file

function Base() {
    return (
        <div className="Home">
            <header className="Home-header">
                <img src={myImage} alt="Descriptive Alt Text" className="Home-logo" />
                <div className="Home-header-text">
                    <h1>Beneski EML DataHub</h1>
                </div>
            </header>
        </div>
    );
}


export default Base;
