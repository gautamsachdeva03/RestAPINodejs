let expect = require("chai").expect;
let testHelper = require('../common/testHelper');
let jsonSchema = require('../common/jsonSchema');
let utilHelper = require('../../utils/utils');
let prop = require('./../../utils/constants')
var orderId;

describe('Take order', function () {

    beforeEach(async function () {
        let numberOfStops = 3;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops);
        var res = await testHelper.placeOrder(jsonData);
        orderId = res.body.id;
    });

    it('should take order with valid id', async function () {
        var res = await testHelper.takeOrder(orderId);
        expect(res.status).to.equal(200);
        //verify json schema            
        expect(res.body).to.be.jsonSchema(jsonSchema.jsonTakeOrder);
    });

    it('should not take order that is already in ongoing status', async function () {
        await testHelper.takeOrder(orderId);
        var res = await testHelper.takeOrder(orderId);
        //verify status code    
        expect(res.status).to.equal(422);
        //verification for message
        expect(res.response.text).to.contain(prop.error_422_statusNotOnAssigning);
    });

    it('should not take order that is already in completed status', async function () {
        await testHelper.takeOrder(orderId);
        await testHelper.completeOrder(orderId);

        var res = await testHelper.takeOrder(orderId);
        //verify status code    
        expect(res.status).to.equal(422);
        //verification for message
        expect(res.response.text).to.contain(prop.error_422_statusNotOnAssigning);
    });

    it('should not take order that is already in cancelled status', async function () {
        await testHelper.takeOrder(orderId);
        await testHelper.cancelOrder(orderId);

        var res = await testHelper.takeOrder(orderId);
        //verify status code    
        expect(res.status).to.equal(422);
        //verification for message
        expect(res.response.text).to.contain(prop.error_422_statusNotOnAssigning)
    });

    it('should give an error when passing invalid order id', async function () {
        var res = await testHelper.takeOrder(orderId + 100);
        //verification for status code
        expect(res.status).to.equal(404);
        //verification for message
        expect(res.response.text).to.contain(prop.error_404_orderNotFound);
    });

});