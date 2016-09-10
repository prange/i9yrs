import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import moment from 'moment'

const RemainingPanel = ({endtime})=> (
    <div style={{padding:"10px"}}>
        <span>{endtime}</span>
    </div>);

const mapDispatchToProps = (dispatch) => {
    return {}
};

const mapStateToProps = (state)=> {
    const d = moment.duration(moment(state.time.endtime).diff(moment()));
    return {endtime: d.minutes() + " minutter og " + d.seconds() + " sekunder"}
};

const RemainingPanelContainer = connect(mapStateToProps, mapDispatchToProps)(RemainingPanel);

export default RemainingPanelContainer