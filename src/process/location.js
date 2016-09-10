import * as events from '../events'
import Kefir from 'kefir'


const bindLocation = (store) => {
    const posStream = navigator.geolocation ?
        Kefir.stream(emitter => {

            const id = navigator.geolocation.watchPosition(
                (position)=>emitter.emit(position),
                (error)=>emitter.error(error),
                {
                    timeout: 5000,
                    enableHighAccuracy: true,
                    maximumAge: Infinity
                });

            return () => {
                navigator.geolocation.clearWatch(id);
            }

        })
        : Kefir.constantError("No geolocation available");

    posStream
        .onValue((pos)=>console.log(pos))
        .onValue((pos)=>store.dispatch(events.updateLocation({latitude:pos.coords.latitude,longitude:pos.coords.longitude,heading:pos.coords.heading?pos.coords.heading:0})))
        .onError((err)=>console.log(err));

};

export default bindLocation