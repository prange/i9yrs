import React, {PropTypes} from 'react';
import {connect} from 'react-redux'

const StartPage = ({items})=> (
    <div>
        <div>
            Startside
        </div>
    </div>);

const mapDispatchToProps = (dispatch) => {
    return {}
};

const mapStateToProps = (state)=> {
    return {items: state.quest.tasks}
};

const StartPageContainer = connect(mapDispatchToProps, mapStateToProps)(StartPage);

export default StartPageContainer