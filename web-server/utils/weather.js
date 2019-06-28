const request = require('request')

const weather = (information, callback) => {
    const url = `https://api.darksky.net/forecast/e25d57575612bddbdad82ee34398d0c3/${information.lat},${information.long}?units=si`;
    request({url, json: true}, (error, response) => {
        const weatherJSON = (response.body)
        const summary = weatherJSON.daily.data[0].summary
        const temp = weatherJSON.currently.temperature
        const constProb = weatherJSON.currently.precipProbability
        const location = information.location
        if(error) {
            callback('unable to connect to weather services', undefined)
        } else if (response.body.error) {
            callback('unable to find weather for this location', undefined)
        } else {
            callback(undefined, {
                summary,
                temp,
                constProb,
                location
            })
        }
    })
}

module.exports = weather