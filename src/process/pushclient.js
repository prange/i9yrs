import * as events from '../events'
import moment from 'moment'

const bindPush = (pusher, store, id) => {
    const channel = pusher.subscribe('private-sync');
    channel.bind('pusher:subscription_succeeded', (data)=> {
        const evt = channel.trigger('client-online', {client: id})
    });
    channel.bind('countdown', (data) => {
        if (data.endtime) {
            //const event = moment("201706101800","YYYYMMDDhhmm")
            const event = moment(data.endtime, "YYYYMMDDhhmm").valueOf()
            store.dispatch(events.setEndTime(event));
            store.dispatch(events.setRemainingTime(moment().valueOf()))
        }
    });
};

export default bindPush