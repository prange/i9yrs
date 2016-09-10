import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import App from './view/App'
import StartPage from './view/questions/StartPage'
import TaskPage from './view/questions/TaskPage'
import {store} from "./store"
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import timer from './process/timer'
import bindLocation from './process/location'
import * as events from './events'

console.log(store.getState());
console.log(window.location.href);


timer(store);
bindLocation(store);
render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <Route path=":team" component={StartPage} onEnter={(state)=>store.dispatch(events.selectQuest(state.params.team))}/>
                <Route path=":team/:taskid" component={TaskPage}/>
            </Route>
        </Router>
    </Provider>
), document.getElementById('main'));

/*
 <Provider store={store}>
 <Router history={hashHistory}>
 <Route path="/" component={App}>
 <IndexRoute component={Home} />
 <Route path="about" component={About} />
 <Route path="inbox" component={Inbox} />
 </Route>
 </Router>
 </Provider>
 */