import {cp} from './util'
import {combineReducers} from 'redux'
import * as fp from 'lodash/fp'
import * as events from './events';
import * as L from 'js-lenses'
import moment from 'moment'
import geolib from 'geolib'


/*
 * Lat long
 * Bak Bunker 18 63.430939, 10.440273
 * Lekeplassen ved huset mitt 63.429326, 10.443240
 * Veien bak huset mitt : 63.428849, 10.443497
 * Det bruen huset ved grusbanen 63.431143, 10.447472
 * Branntrappa 63.429091, 10.443808
 * Lekeplassen 63.432436, 10.444699
 * */

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
                    place: "Det brune huset ved grusbanen",
                    ttext: "I garasjen, hvilket symbol er tegnet i grusen helt innerst i hjørnet?",
                    location: {
                        latitude: 63.431143,
                        longitude: 10.447472
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
                    place: "Baksiden av huset til Pappaen til Isak",
                    ttext: "Når du står ved enden av veien, hvor mange kumlokk ser man?",
                    location: {
                        latitude: 63.428849,
                        longitude: 10.443497
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
                    place: "Bunker 18",
                    ttext: "Hvor mange tilhengere står parkert?",
                    location: {
                        latitude: 63.430939,
                        longitude: 10.440273
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
                    place: "Foran huset til Pappaen til Isak",
                    ttext: "Hvor mange planker er benken laget av?",
                    location: {
                        latitude: 63.429326,
                        longitude: 10.443240
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
                    place: "Bunker 18",
                    ttext: "Hvor mange hjørner har grillhytta til barnehagen?",
                    location: {
                        latitude: 63.430939,
                        longitude: 10.440273
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
                    place: "Lekeplassen bak det røde huset",
                    ttext: "Hvor mange mange vinduer har det lille huset ved siden av trampolinen?",
                    location: {
                        latitude: 63.432436,
                        longitude: 10.444699
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
                    place: "Lekeplassen bak det røde huset",
                    ttext: "Hvor mange mange vinduer har det lille huset ved siden av trampolinen?",
                    location: {
                        latitude: 63.432436,
                        longitude: 10.444699
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
                    place: "Det brune huset ved grusbanen",
                    ttext: "På vegen ved oppgangen henger det et svart skilt på veggen, hva er formen på figuren på skiltet?",
                    location: {
                        latitude: 63.431143,
                        longitude: 10.447472
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
                    place: "Ved huset til pappaen til Isak",
                    ttext: "I den grå kassen ved branntrappen, hvor mange spader ligger oppi?",
                    location: {
                        latitude: 63.429091,
                        longitude: 10.443808
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
                    ttext: "Hvor mange mange vinduer er det på veggen mot parkeringsplassen med tilhengere?",
                    location: {
                        latitude: 63.430939,
                        longitude: 10.440273
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
                    place: "Det brune huset ved grusbanen",
                    ttext: "På veien ved oppgangen henger det et svart skilt på veggen, hva er formen på figuren på skiltet?",
                    location: {
                        latitude: 63.431143,
                        longitude: 10.447472
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
                    place: "Ved huset til pappaen til Isak",
                    ttext: "I den grå kassen ved branntrappen, hvor mange spader ligger oppi?",
                    location: {
                        latitude: 63.429091,
                        longitude: 10.443808
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
            place: "",
            ttext: "",
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
            place: "",
            ttext: "",
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
            place: "",
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

        return {distance: dist, direction: -(bearing - heading)};
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
    endtime: moment("201609111600", "YYYYMMDDhhmm").valueOf(),
    remaining: moment().to(moment("20160911600", "YYYYMMDDhhmm")).valueOf()
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

