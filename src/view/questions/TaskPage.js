import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import * as events from '../../events'

const TaskPage = ({tasks, params:{taskid}, handleChange})=> {
    const task = tasks[taskid];
    return (
        <div>
            <div className="text-center lead">
                Oppgave {task.tasknumber}
            </div>
            <div className="text-center">
                <h3>{task.place}</h3>
            </div>
            <div className="text-center lead">
                Avstand: {task.directions.distance}m - Retning: <div style={{transform:'rotate(-' + task.directions.direction + 'deg)'}}>&#8593;</div>
            </div>
            <div className="text-center lead">
                <h1>{task.ttext}</h1>
            </div>
            <div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Skriv svaret her:</label>
                    <input
                        style={{fontFamily:"monospace"}}
                        id="exampleInputEmail1"
                        className="form-control"
                        type="text"
                        value={task.answer}
                        onChange={(event)=>handleChange(taskid, event.target.value)}
                    />
                </div>
            </div>
        </div>);
};

const mapStateToProps = (state)=> {
    return {tasks: state.quest.tasks}
};

const mapDispatchToProps = (dispatch) => {
    return {handleChange: (taskid, value)=>dispatch(events.updateAnswer(taskid, value))}
};

const TaskPageContainer = connect(mapStateToProps, mapDispatchToProps)(TaskPage);

export default TaskPageContainer

