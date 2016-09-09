import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import LocationPage from './LocationPage'
import QuestionPage from './QuestionPage'

const TaskPage = ({tasks, params:{taskid}})=> {
    const task = tasks[taskid];
    //return (<div>wrapperpage {task.taskid}</div>);
    //return <QuestionPage task={task}/>;
    return task.location ? <LocationPage task={task}/> : <QuestionPage task={task}/>;
}

const mapStateToProps = (state)=> {
    return {tasks: state.quest.tasks}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

const TaskPageContainer = connect(mapStateToProps, mapDispatchToProps)(TaskPage);

export default TaskPageContainer

