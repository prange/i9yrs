import React, {PropTypes} from 'react';
import {connect} from 'react-redux'

const LocationPage = ({task})=> (
    <div>
        <div>
            Oppgave {task.tasknumber}
        </div>
        <div>
            {task.ttext}
        </div>

    </div>
);

export default LocationPage

