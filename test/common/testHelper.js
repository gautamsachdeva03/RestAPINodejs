let superagent = require("superagent");
let utilHelper = require('./../../utils/utils');
let chai = require("chai")
let expect = chai.expect;
chai.use(require('chai-json-schema'));
let prop = require('./../../utils/constants');
let jsonSchema = require('../common/jsonSchema');
let baseURL = prop.baseURL;

async function placeOrder(jsonData) {
    var res;
    try {
        res = await superagent.post(baseURL).set('Content-Type', 'application/json').send(jsonData);
    } catch (err) {
        return err;
    }
    return res;
}

async function getOrder(orderId) {
    var res;
    try {
        res = await superagent.get(baseURL + "/" + orderId).set('Content-Type', 'application/json');
    } catch (err) {
        return err;
    }
    return res;
}

async function cancelOrder(orderId) {
    var res;
    try {
        res = await superagent.put(baseURL + "/" + orderId + "/cancel").set('Content-Type', 'application/json');
    } catch (err) {
        return err;
    }
    return res;
}

async function takeOrder(orderId) {
    var res;
    try {
        res = await superagent.put(baseURL + "/" + orderId + "/take").set('Content-Type', 'application/json');
    } catch (err) {
        return err;
    }
    return res;
}

async function completeOrder(orderId) {
    var res;
    try {
        res = await superagent.put(baseURL + "/" + orderId + "/complete").set('Content-Type', 'application/json');
    } catch (err) {
        return err;
    }
    return res;
}

function verifyPostOrder(res) {
    //verify status code 
    expect(res.status).to.equal(201);
    //id should be numeric 
    expect(res.body.id).to.be.a('number');
    //calculate fare as per stops and late night charges
    var expectedFare = utilHelper.calculateFare(res.body.drivingDistancesInMeters);
    expect(expectedFare).to.equal(Number(res.body.fare.amount));
    //verify currency value
    expect(prop.currencyUnit).to.equal(res.body.fare.currency);
    //verify json schema            
    expect(res.body).to.be.jsonSchema(jsonSchema.jsonPlaceOrder);
}

module.exports.getOrder = getOrder;
module.exports.placeOrder = placeOrder;
module.exports.takeOrder = takeOrder;
module.exports.cancelOrder = cancelOrder;
module.exports.completeOrder = completeOrder;
module.exports.verifyPostOrder = verifyPostOrder;