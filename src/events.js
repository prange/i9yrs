export const SET_DIRECTION = 'SET_DIRECTION';
export const SET_LOCATION = 'SET_LOCATION';
export const UPDATENAME = 'UPDATENAME';
export const SET_END_TIME = 'SET_END_TIME';
export const SET_REMAINING_TIME = 'SET_REMAINING_TIME';
export const UPDATE_ANSWER = 'UPDATE_ANSWER';
export const SELECT_QUEST = 'SELECET_QUEST';
export const action =
    (type, value) => {
        return {type: type, value: value}
    };

export const setDirections =
    (taskid, directions) => action(SET_DIRECTION, {directions: directions});

export const updateLocation =
    (location) => action(SET_LOCATION, {location: location});

export const updateName =
    (name) => action(UPDATENAME, {name: name});

export const setEndTime =
    (endtime) => action(SET_END_TIME, {endtime: endtime});

export const setRemainingTime =
    (now) => action(SET_REMAINING_TIME, {now: now});

export const updateAnswer =
    (taskid, value) => action(UPDATE_ANSWER, {taskid, value});

export const selectQuest =
    (team) => action(SELECT_QUEST, {team:team});