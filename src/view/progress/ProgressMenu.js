import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import * as _ from 'lodash/fp'


const itemBg = (solved) => {
    return {colow: "white", background: solved ? "green" : "orangered"}
};

const ProgressItem = ({item, selectProgress})=>(
    <td onClick={selectProgress}>
        <div style={itemBg(item.solved)}>
            {item.tasknumber}
            {item.answer}
        </div>
    </td>
);
const ProgressMenu = ({items},context) =>{
    return (<table style={{width: "100%"}}>
        <tbody>
        <tr>
            {items.map(
                item => (
                    <ProgressItem
                        key={item.taskid}
                        item={item}
                        selectProgress={(event)=>{ event.preventDefault();return context.router.push('/' + item.taskid)}}
                    />))}
        </tr>
        </tbody>
    </table>
)};

ProgressMenu.contextTypes = {router: React.PropTypes.any};

const mapDispatchToProps = (dispatch) => {
    return {selectProgress: (id)=>()=>alert('Progress ' + id + 'clicked')}
};

const mapStateToProps = (state)=> {
    return {items: _.values(state.quest.tasks)}
};

const ProgressMenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressMenu);

export default ProgressMenuContainer