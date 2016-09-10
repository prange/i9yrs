import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import moment from 'moment'

const RemainingPanel = ({minutes, seconds})=> (
    <div style={{padding: "10px"}}>
        <span>
            <strong>{minutes}</strong> {minutes == 1 ? 'minutt ' : 'minutter '}
            <strong>{seconds}</strong> {seconds == 1 ? 'sekund' : 'sekunder'}
            </span>
    </div>);

const mapDispatchToProps = (dispatch) => {
    return {}
};

const mapStateToProps = (state)=> {
    const d = moment.duration(moment(state.time.endtime).diff(moment()));
    return {minutes: d.minutes(), seconds: d.seconds()}
};

const RemainingPanelContainer = connect(mapStateToProps, mapDispatchToProps)(RemainingPanel);

export default RemainingPanelContainer