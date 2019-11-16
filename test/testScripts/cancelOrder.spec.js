var expect = require("chai").expect;
let testHelper = require('../common/testHelper');
let jsonSchema = require('../common/jsonSchema');
let utilHelper = require('../../utils/utils');
let prop = require('./../../utils/constants')
var orderId;

describe('Cancel order', function () {

    beforeEach(async function () {
        let numberOfStops = 3;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops);
        var res = await testHelper.placeOrder(jsonData);
        orderId = res.body.id;
    });

    it('should cancel order from assigning status with valid order id', async function () {
        var res = await testHelper.cancelOrder(orderId);

        //verification for status code
        expect(res.status).to.equal(200);
        //status validation from response
        expect(res.body.status).to.equal(prop.status_canceled);
        //verify json schema            
        expect(res.body).to.be.jsonSchema(jsonSchema.jsonCancelOrder);
    });

    it('should cancel order from ongoing status with valid order id', async function () {
        await testHelper.takeOrder(orderId);

        var res = await testHelper.cancelOrder(orderId);
        //verification for status code
        expect(res.status).to.equal(200);
        //status validation from response
        expect(res.body.status).to.equal(prop.status_canceled);
        //verify json schema            
        expect(res.body).to.be.jsonSchema(jsonSchema.jsonCancelOrder);
    });

    it('should give an error when canceling the same order that is already in completed state', async function () {
        await testHelper.takeOrder(orderId);
        await testHelper.completeOrder(orderId);

        var res = await testHelper.cancelOrder(orderId);
        //verification for status code
        expect(res.status).to.equal(422);
        //verification for message
        expect(res.response.text).to.contain(prop.error_422_statusAlreadyCompleted);
    });

    it('should give an error when passing invalid order id', async function () {
        var res = await testHelper.cancelOrder(orderId + 100);
        //verification for status code
        expect(res.status).to.equal(404);
        //verification for message
        expect(res.response.text).to.contain(prop.error_404_orderNotFound);
    });

});