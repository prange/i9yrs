import * as events from './events'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const likeAsync =
    (dispatcher,getState) => {
        dispatcher(events.like())
        delay(2000).then(()=>dispatcher(events.dislike()))
    };