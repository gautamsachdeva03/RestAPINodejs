let path = require('path');
let csvToJson = require('convert-csv-to-json');
let json = csvToJson.formatValueByType().getJsonFromCsv(path.resolve(__dirname, 'payload.csv'));
let moment = require('moment');
var rn = require('random-number');
var timeZone;
var prop = require('./constants');
const math = require('mathjs')

function generateInvalidLocationOrderPayload(totalStops) {
    let obj = {};
    let stops = [];
    for (let i = 0; i < totalStops; i++) {
        stops.push({
            "lat": generateRandomFloatWithRange(10, 100, 6),
            "lng": generateRandomFloatWithRange(100, 400, 6)
        });
    }
    obj.stops = stops;
    return JSON.stringify(obj);
}

function generateRandomFloatWithRange(minRange, maxRange, precision) {
    var gen = rn.generator({
        min: minRange
        , max: maxRange
        , integer: false
    });
    return gen().toPrecision(precision);
}

function generateRandomIntegerWithRange(minRange, maxRange) {
    var gen = rn.generator({
        min: minRange
        , max: maxRange
        , integer: true
    });
    return gen();
}

function generateOrderPayload(totalStops, orderTime) {
    let obj = {};
    let stops = [];

    if (orderTime) {
        obj.orderAt = orderTime;
    }

    for (let i = 0; i < totalStops; i++) {
        stops.push(json[i]);
    }
    obj.stops = stops;
    return JSON.stringify(obj);
}

function formatDateTime(status, timeSlot) {
    switch (status) {
        case "future":
            timeZone = moment().add(2, 'years').utc().format();
            if (timeSlot === "night") {
                timeZone = moment(timeZone).utc().set('hour', generateRandomIntegerWithRange(22, 24)).format();
            }
            else if ((timeSlot === "day")) {
                timeZone = moment(timeZone).utc().set('hour', generateRandomIntegerWithRange(6, 21)).format();
            }
            else {
                timeZone = moment(timeZone).utc().set('hour', generateRandomIntegerWithRange(6, 21)).format();
            }
            //console.log(timeZone);
            break;
        case "past":
            timeZone = moment().subtract(5, 'years').utc().format();
            break;
        default:
            timeZone = moment().utc().format();
            break;
    }
    return timeZone;
}

function calculateFare(distance) {
    let totalDistanceMeters = 0;
    let totalFare = 0;
    let extraFare = 0;
    let baseDistanceMeters = prop.baseDistanceMeters;
    let metersDividend = prop.metersDividend;
    let baseFare;
    let priceMultiplier;
    var currentHour = moment(timeZone).utc().get('hours');

    if (currentHour >= 22 || currentHour <= 5) {
        baseFare = prop.baseFareLateNight;
        priceMultiplier = prop.priceMultiplierLateNight;
    }
    else {
        baseFare = prop.baseFare;
        priceMultiplier = prop.priceMultiplier;
    }

    distance.forEach(element => {
        totalDistanceMeters = totalDistanceMeters + element;
    });

    if (totalDistanceMeters > 0) {
        if (totalDistanceMeters >= baseDistanceMeters) {
            let remainingDistance = totalDistanceMeters - baseDistanceMeters;
            extraFare = (remainingDistance / metersDividend) * priceMultiplier;
        }
    }

    totalFare = baseFare + extraFare;

    return math.round(totalFare, 2);
}

module.exports.generateOrderPayload = generateOrderPayload;
module.exports.generateInvalidLocationOrderPayload = generateInvalidLocationOrderPayload;
module.exports.formatDateTime = formatDateTime;
module.exports.calculateFare = calculateFare;
module.exports.generateRandomFloatWithRange = generateRandomFloatWithRange;
module.exports.generateRandomIntegerWithRange = generateRandomIntegerWithRange; 