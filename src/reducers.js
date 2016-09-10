import {cp} from './util'
import {combineReducers} from 'redux'
import * as fp from 'lodash/fp'
import * as events from './events';
import * as L from 'js-lenses'
import moment from 'moment'
import geolib from 'geolib'

const exampleQuestsStore =
{
    selectedQuest: "1",
    selectedTask: "1",
    quests: [
        {
            tasks: {
                "1": {
                    tasknumber: 1,
                    taskid: "1",
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
                        direction: 0
                    }
                },
                "2": {
                    tasknumber: 2,
                    taskid: "2",
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
                        direction: 0
                    }
                },
                "3": {
                    tasknumber: 3,
                    taskid: "3",
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
                        direction: 0
                    }
                }
            }
        },
        {
            tasks: {
                "1": {
                    tasknumber: 1,
                    taskid: "1",
                    solved: false,
                    answer: '',
                    place: "Aastahagen",
                    ttext: "Hvilken form har taket",
                    location: {
                        latitude: 63.430113,
                        longitude: 10.436191
                    },
                    directions: {
                        bearing: 1,
                        direction: 0
                    }
                },
                "2": {
                    tasknumber: 2,
                    taskid: "2",
                    solved: false,
                    answer: '',
                    place: "Tordenskjold",
                    ttext: "Hvilken form har hjulene?",
                    location: {
                        latitude: 62.430113,
                        longitude: 9.436191
                    },
                    directions: {
                        bearing: 1,
                        direction: 0
                    }
                },
                "3": {
                    tasknumber: 3,
                    taskid: "3",
                    solved: false,
                    answer: '',
                    place: "Majorstuen",
                    ttext: "På lekeplassen står det et kunstverk som lyser. Hva er formen på det som lyser",
                    location: {
                        latitude: 63.430113,
                        longitude: 10.436191
                    },
                    directions: {
                        bearing: 1,
                        direction: 0
                    }
                }
            }
        },
        {
            tasks: {
                "1": {
                    tasknumber: 1,
                    taskid: "1",
                    solved: false,
                    answer: '',
                    place: "Bunker 18",
                    ttext: "Hva er formen på døra nærmest persaunetveien",
                    location: {
                        latitude: 63.430113,
                        longitude: 10.436191
                    },
                    directions: {
                        bearing: 1,
                        direction: 0
                    }
                },
                "2": {
                    tasknumber: 2,
                    taskid: "2",
                    solved: false,
                    answer: '',
                    place: "Huset til pappaen til Isak",
                    ttext: "På vegen ved oppgangen henger det et svart skilt på veggen, hva er formen på figuren på skiltet?",
                    location: {
                        latitude: 62.430113,
                        longitude: 9.436191
                    },
                    directions: {
                        bearing: 1,
                        direction: 0
                    }
                },
                "3": {
                    tasknumber: 3,
                    taskid: "3",
                    solved: false,
                    answer: '',
                    place: "Tregården restaurant",
                    ttext: "Lekestativet har en lite tunell, hva er formen på tunellen?",
                    location: {
                        latitude: 63.430113,
                        longitude: 10.436191
                    },
                    directions: {
                        bearing: 1,
                        direction: 0
                    }
                }
            }
        }
    ],
    tasks: {
        "1": {
            tasknumber: 1,
            taskid: "1",
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
                direction: 0
            }
        },
        "2": {
            tasknumber: 2,
            taskid: "2",
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
                direction: 0
            }
        },
        "3": {
            tasknumber: 3,
            taskid: "3",
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
                direction: 0
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

        return {distance: dist, direction: bearing - heading};
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
                return L.set(solvedLens, action.value.value, stateWithUpdatedAnswer);
            }
            case events.SELECT_QUEST:{
                const quest = state.quests[action.value.team - 1].tasks;
                const questLens = L.of('tasks');
                const selectedQuestLens = L.of('selectedQuest');
                const stateWithSelectedQuest = L.set(selectedQuestLens,action.value.team,state);
                return L.set(questLens, quest, stateWithSelectedQuest);
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

