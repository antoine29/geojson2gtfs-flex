const agencyObjectGenerator = require('./agencyObjectGenerator');

function gtfsStopsFileFields() {
    return [
        {
            value: 'stopId',
            label: 'stop_id'
        },
        {
            value: 'lat',
            label: 'stop_lat'
        },
        {
            value: 'long',
            label: 'stop_lon'
        },
        {
            value: 'streetName',
            label: 'stop_name'
        }
    ];
}

function getDirectionFromCoords(geoJsonObject, index){
    // return geoJsonObject.gtfs.addressNames[index];
    return 'here';
}

function getStopId(geoJsonObjectIndex, stopIndex){
    return `${geoJsonObjectIndex}_${stopIndex}`;
}

function getStopLat(geoJsonObject, i){
    let coordinate = geoJsonObject.features[0].geometry.coordinates[i];
    return coordinate[1];
}

function getStopLong(geoJsonObject, i){
    let coordinate = geoJsonObject.features[0].geometry.coordinates[i];
    return coordinate[0];
}

exports.stopsObjectGenerator = function(geoJsonObject, geoJsonObjectIndex) {
    let stops = [];
    // let lat, long;
    // for (let i=0; i<geoJsonObject.features[0].geometry.coordinates.length; i++) {
    //     lat = getStopLat(geoJsonObject, i);
    //     long = getStopLong(geoJsonObject, i);
    //     stops.push({
    //         stopId: getStopId(geoJsonObjectIndex, i),
    //         lat: lat,
    //         long: long,
    //         streetName: getDirectionFromCoords(geoJsonObject, i)
    //     });
    // }

    stops.push({
        stopId: getStopId(geoJsonObjectIndex, 0),
        lat: getStopLat(geoJsonObject, 0),
        long: getStopLong(geoJsonObject, 0),
        streetName: getDirectionFromCoords(geoJsonObject, 0)
    });

    const lastIndex = geoJsonObject.features[0].geometry.coordinates.length - 1;
    stops.push({
        stopId: getStopId(geoJsonObjectIndex, lastIndex),
        lat: getStopLat(geoJsonObject, lastIndex),
        long: getStopLong(geoJsonObject, lastIndex),
        streetName: getDirectionFromCoords(geoJsonObject, lastIndex)
    });
    
    return {
        fields: gtfsStopsFileFields(),
        values: stops
    };
};

exports.stopsObjectFields = function() {
    return {
        fields: gtfsStopsFileFields(),
        values: []
    };
};
