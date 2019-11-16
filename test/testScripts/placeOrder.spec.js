let chai = require("chai")
let expect = chai.expect;
let testHelper = require('../common/testHelper');
let utilHelper = require('../../utils/utils');
let prop = require('./../../utils/constants');

describe('Place order', function () {

    it('should place a new order with two stops', async function () {
        let numberOfStops = 2;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops);

        var res = await testHelper.placeOrder(jsonData);
        testHelper.verifyPostOrder(res);
    });

    it('should place a new order with three stops', async function () {
        let numberOfStops = 3;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops);

        var res = await testHelper.placeOrder(jsonData);
        testHelper.verifyPostOrder(res);
    });

    it('should place a new order with four stops', async function () {
        let numberOfStops = 4;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops);

        var res = await testHelper.placeOrder(jsonData);
        testHelper.verifyPostOrder(res);
    });

    it('should place a new order containing two stops with future date', async function () {
        let numberOfStops = 2;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops, utilHelper.formatDateTime("future", "day"));

        var res = await testHelper.placeOrder(jsonData);
        testHelper.verifyPostOrder(res);
    });

    it('should place a new order containing three stops with future date and late night', async function () {
        let numberOfStops = 3;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops, utilHelper.formatDateTime("future", "night"));

        var res = await testHelper.placeOrder(jsonData);
        testHelper.verifyPostOrder(res);
    });

    it('should place a new order containing four stops with future date and late night', async function () {
        let numberOfStops = 4;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops, utilHelper.formatDateTime("future", "night"));

        var res = await testHelper.placeOrder(jsonData);
        testHelper.verifyPostOrder(res);
    });

    it('should not place an order and give error if payload contains only one stop', async function () {
        let numberOfStops = 1;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops);

        var res = await testHelper.placeOrder(jsonData);
        //verifying the status code
        expect(res.status).to.equal(400);
        //verifying the message body
        expect(res.response.text).to.contain(prop.error_400_errorInStopsField);
    });

    it('should not place an order and give error for past date', async function () {
        let numberOfStops = 3;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops, utilHelper.formatDateTime("past"));

        var res = await testHelper.placeOrder(jsonData);
        //verifying the status code
        expect(res.status).to.equal(400);
        //verifying the message body
        expect(res.response.text).to.contain(prop.error_400_pastOrder);
    });

    it('should not place an order and give error for invalid lat/lng', async function(){
        let numberOfStops = 3;
        let jsonData = await utilHelper.generateInvalidLocationOrderPayload(numberOfStops);
        
        var res = await testHelper.placeOrder(jsonData);
        //verifying the status code
        expect(res.status).to.equal(400);
    });

});