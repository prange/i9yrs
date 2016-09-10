import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import App from './view/App'
import StartPage from './view/questions/StartPage'
import TaskPage from './view/questions/TaskPage'
import {store} from "./store"
import {Router, Route, IndexRoute, Link, hashHistory} from 'react-router'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import Pusher from 'pusher-js'
import bindPush from './process/pushclient'
import timer from './process/timer'
import bindLocation from './process/location'

console.log(store.getState());
console.log(window.location.href);

const pusher = new Pusher('8c7355ea088bc48d48bf', {
    cluster: 'eu',
    encrypted: true,
    authEndpoint:'https://i9yrs-142915.appspot.com/auth',
    authTransport: 'jsonp'
});

bindPush(pusher, store,'a');
timer(store);
bindLocation(store);

render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={StartPage}/>
                <Route path=":taskid" component={TaskPage}/>
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