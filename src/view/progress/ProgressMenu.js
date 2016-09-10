import React, {PropTypes} from 'react';
import {connect} from 'react-redux'
import * as _ from 'lodash/fp'


const itemBg = (solved) => {
    return {color: "white", background: solved ? "green" : "orange", height: "60px"}
};

const ProgressItem = ({item, selected, selectProgress})=>(
    <td onClick={selectProgress} style={{height: "60px", width: "33%", border: "1px solid white", textAlign: "center"}}>
        <div style={itemBg(item.solved)}>
            <div className="lead" style={{paddingTop: "20px"}}>
                {item.tasknumber}
            </div>
        </div>
    </td>
);
const ProgressMenu = ({items,selectedQuest}, context) => {
    return (<table style={{width: "100%"}}>
            <tbody>
            <tr style={{height: "60px"}}>
                {items.map(
                    item => (
                        <ProgressItem
                            key={item.taskid}
                            item={item}
                            selectProgress={(event)=> {
                                event.preventDefault();
                                return context.router.push('/' + selectedQuest + '/' +item.taskid)
                            }}
                        />))}
            </tr>
            </tbody>
        </table>
    )
};

ProgressMenu.contextTypes = {router: React.PropTypes.any};

const mapDispatchToProps = (dispatch) => {
    return {selectProgress: (id)=>()=>alert('Progress ' + id + 'clicked')}
};

const mapStateToProps = (state)=> {
    return {items: _.values(state.quest.tasks),selectedQuest:state.quest.selectedQuest}
};

const ProgressMenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressMenu);

export default ProgressMenuContainer