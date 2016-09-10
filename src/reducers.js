import {cp} from './util'
import {combineReducers} from 'redux'
import * as fp from 'lodash/fp'
import * as events from './events';
import * as L from 'js-lenses'
import moment from 'moment'
import geolib from 'geolib'

const exampleQuestsStore =
{
    questid: "8f65j63",
    selectedTask: "8g74j38",
    tasks: {
        "8g74j38": {
            tasknumber: 1,
            taskid: "8g74j38",
            solved: false,
            answer: '',
            place: "Huset",
            ttext: "Hva er fargen på gjerdet",
            location: {
                latitude: 63.430113,
                longitude: 10.436191
            },
            directions: {
                bearing: 1,
                direction:0
            }
        },
        "495793j": {
            tasknumber: 2,
            taskid: "495793j",
            solved: false,
            answer: '',
            place: "Bunkeren",
            ttext: "Hvor mange dører har den?",
            location: {
                latitude: 62.430113,
                longitude: 9.436191
            },
            directions: {
                bearing: 1,
                direction:0
            }
        },
        "8g74j39": {
            tasknumber: 3,
            taskid: "8g74j39",
            solved: false,
            answer: '',
            place: "Barnehagen",
            ttext: "Gå til barnehagen, hvilken form har vinduene",
            location: {
                latitude: 43.430113,
                longitude: 10.436191
            },
            directions: {
                bearing: 1,
                direction:0
            }
        },
        "8k74j39": {
            tasknumber: 4,
            taskid: "8k74j39",
            solved: false,
            answer: '',
            place: "Kjelleren i huset til Isak",
            ttext: "",
            location: {
                latitude: 63.430113,
                longitude: 10.436191
            },
            directions: {
                bearing: 1,
                direction:0
            }
        }
    }
};


const getUpdatedDirections =
    (currentPos, task) => {
        const dist =
            geolib.getDistance({latitude: currentPos.latitude, longitude: currentPos.longitude}, task.location);

        const bearing =
            geolib.getBearing({latitude: currentPos.latitude, longitude: currentPos.longitude}, task.location);

        const heading =
            currentPos.heading;

        return {distance: dist, direction: bearing-heading};
    };

const questReducer =
    (state = exampleQuestsStore, action) => {
        switch (action.type) {
            case events.SET_LOCATION: {
                return fp.reduce((sum, taskid)=> {
                    const newDirections = getUpdatedDirections(action.value.location, state.tasks[taskid]);
                    const updateDirection = L.ofPath('tasks', taskid, 'directions');
                    return L.set(updateDirection, newDirections, sum);
                }, state)(fp.keys(state.tasks));
            }
            case events.UPDATE_ANSWER: {
                const answerLens = L.ofPath('tasks', action.value.taskid, 'answer');
                const stateWithUpdatedAnswer = L.set(answerLens, action.value.value, state);
                const solvedLens = L.ofPath('tasks', action.value.taskid, 'solved');
                const udpatedStateWithSolved = L.set(solvedLens, action.value.value, stateWithUpdatedAnswer);
                return udpatedStateWithSolved;
            }
            default:
                return state;
        }

    };


const exampleTimeStore = {
    endtime: moment("201609111400", "YYYYMMDDhhmm").valueOf(),
    remaining: moment().to(moment("201609111400", "YYYYMMDDhhmm")).valueOf()
};

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
        time: timeReducer
    });

