const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXVyaXRvejk1IiwiYSI6ImNqeDd4OGpvYzBiZjczbnBwdm5lNnQweDkifQ.pJweepH9HzUmvkiIIwTANA`
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('unable to connect to location services', undefined)
        } else if (response.body.features.length === 0) {
            callback('unable to find location, try another search', undefined)
        } else {
            callback(undefined, {
                lat: response.body.features[0].center[1],
                long: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode