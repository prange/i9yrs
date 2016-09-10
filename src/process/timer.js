import * as events from '../events'
import moment from 'moment'

const bindTimer = (store) => {
    setInterval(()=>store.dispatch(events.setRemainingTime(moment())), 100000)
};

export default bindTimer