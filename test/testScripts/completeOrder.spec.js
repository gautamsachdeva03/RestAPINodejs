let expect = require("chai").expect;
let testHelper = require('../common/testHelper');
let jsonSchema = require('../common/jsonSchema');
let utilHelper = require('../../utils/utils');
let prop = require('./../../utils/constants');
var orderId;

describe('Complete order', function () {

    beforeEach(async function () {
        let numberOfStops = 3;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops);
        var res = await testHelper.placeOrder(jsonData);
        orderId = res.body.id;
    });

    it('should complete the order from ongoing status with vaild order id', async function () {
        await testHelper.takeOrder(orderId);

        var res = await testHelper.completeOrder(orderId);
        //verification for status code
        expect(res.status).to.equal(200);
        //verification for message
        expect(res.body.status).to.equal(prop.status_completed);
        //verify json schema            
        expect(res.body).to.be.jsonSchema(jsonSchema.jsonCompleteOrder);
    });

    it('should give an error when status is not on going, current status: Assigning', async function () {
        var res = await testHelper.completeOrder(orderId);
        //verification for status code
        expect(res.status).to.equal(422);
        //verification for messagae
        expect(res.response.text).to.contain(prop.error_422_statusNotOnGoing);
    });

    it('should give an error when status is not on going, current status: Cancelled', async function () {
        await testHelper.cancelOrder(orderId);

        var res = await testHelper.completeOrder(orderId);
        //verification for status code
        expect(res.status).to.equal(422);
        //verification for messagae
        expect(res.response.text).to.contain(prop.error_422_statusNotOnGoing);
    });

    it('should give an error when status is not on going, current status: Completed', async function () {
        await testHelper.takeOrder(orderId);
        await testHelper.completeOrder(orderId);

        var res = await testHelper.completeOrder(orderId);
        //verification for status code
        expect(res.status).to.equal(422);
        //verification for messagae
        expect(res.response.text).to.contain(prop.error_422_statusNotOnGoing);
    });

    it('should give an error when passing invalid order id', async function () {
        var res = await testHelper.completeOrder(orderId + 100);
        //verification for status code
        expect(res.status).to.equal(404);
        //verification for message
        expect(res.response.text).to.contain(prop.error_404_orderNotFound);
    });

});