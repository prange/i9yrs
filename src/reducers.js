import {cp} from './util'
import {combineReducers} from 'redux'
import * as events from './events';
import * as L from 'js-lenses'
import moment from 'moment'

const exampleQuestsStore =
{
    endtimestamp: 87654321,
    questid: "8f65j63",
    selectedTask: "8g74j38",
    tasks: {
        "8g74j38": {
            tasknumber: 1,
            taskid: "8g74j38",
            solved: true,
            answer: 'OK',
            ttext: "Gå til huset",
            location: {
                lat: 123456789,
                long: 123456789
            },
            directions: {
                direction: 1,
                distance: 2
            }
        },
        "495793j": {
            tasknumber: 2,
            taskid: "495793j",
            solved: false,
            answer: 'rød',
            ttext: "Hva er fargen på den innerste døra",
        },
        "8g74j39": {
            tasknumber: 3,
            taskid: "8g74j39",
            solved: false,
            answer: '',
            ttext: "Gå til bunkeren",
            location: {
                lat: 123456789,
                long: 123456789
            },
            directions: {
                direction: 1,
                distance: 2
            }
        }
    }
};


const questReducer =
    (state = exampleQuestsStore, action) => {
        switch (action.type) {
            case events.SET_DIRECTION : {
                const updateDirection = L.ofPath('task', action.value.taskid, 'directions');
                return L.set(updateDirection, action.value.directions, state);
            }
            default:
                return state
        }

    };


const exampleDeviceStore =
{
    currentLocation: {
        lat: 1,
        long: 2
    }
};

const deviceReducer =
    (state = exampleDeviceStore, action)=> {
        switch (action.type) {
            case events.UPDATENAME:
                return cp(state, {name: action.value.name ? action.value.name : state.name});
            default:
                return state
        }
    };
const exampleTimeStore = {
    endtime: moment().add(30, "m").valueOf(),
    remaining: moment().to(moment().add(30, "m")).valueOf()
}

const timeReducer =
    (state = exampleTimeStore, action)=> {
        switch (action.type) {
            case events.SET_END_TIME:
                return cp(state, {endtime: action.value.endtime ? action.value.endtime : state.endtime});
            case events.SET_REMAINING_TIME :
                return cp(state, {remaining: action.value.now ? ( state.endtime - action.value.now) : state.remaining});
            default:
                return state
        }
    };

export const combined =
    combineReducers({
        quest: questReducer,
        device: deviceReducer,
        time: timeReducer
    });

