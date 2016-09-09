import {connect} from 'react-redux'
import {App} from './App'
import * as commands from '../commands'

const mapDispatchToProps = (dispatch) => {
    return {
        incrementClick: () => {
            dispatch(commands.likeAsync)
        }
    }
};

const mapStateToProps = (state)=> {
    return {
        likes: state.counterState.likes,
        dislikes: state.counterState.dislikes}
};

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

export default VisibleTodoList