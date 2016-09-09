import ProgressMenu from './progress/ProgressMenu';
import RemainingPanel from './remaining/RemainingTime'
import React from 'react';

const App = (props) => (
    <div>
        <ProgressMenu/>
        <div>hildren here</div>
        {props.children || "no children"}
        <RemainingPanel/>
    </div>
);

export default App