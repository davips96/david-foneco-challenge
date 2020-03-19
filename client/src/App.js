import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.css';
import Home from './Pages/Home.js';
import Store from './Components/Store.js';

function App() {
    return (
        <div>
            <Store>
                <Home/>
            </Store>
        </div>
    );
}

export default App;
