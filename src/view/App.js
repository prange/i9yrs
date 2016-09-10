import ProgressMenu from './progress/ProgressMenu';
import RemainingPanel from './remaining/RemainingTime'
import React from 'react';

const App = (props) => (
    <div>
        <ProgressMenu/>
        <div className="container-fluid">
            {props.children || "no children"}
        </div>
        <footer className="footer">
            <div className="container-fluid">
                <RemainingPanel/>
            </div>
        </footer>
    </div>
);

export default App