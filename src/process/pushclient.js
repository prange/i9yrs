import * as events from '../events'
import moment from 'moment'

const bindPush = (pusher, store) => {
    const channel = pusher.subscribe('timeupdate');
    channel.bind('countdown', function (data) {
        if (data.endtime) {
            //const event = moment("201706101800","YYYYMMDDhhmm")
            const event = moment(data.endtime,"YYYYMMDDhhmm").valueOf()
            store.dispatch(events.setEndTime(event));
            store.dispatch(events.setRemainingTime(moment().valueOf()))
        }
    });
};

export default bindPush