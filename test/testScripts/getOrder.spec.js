let chai = require("chai")
let expect = chai.expect;
chai.use(require('chai-json-schema'));
let testHelper = require('../common/testHelper');
let jsonSchema = require('../common/jsonSchema');
let utilHelper = require('../../utils/utils');
let prop = require('./../../utils/constants');
var orderId;

describe('Get order', function () {

    beforeEach(async function () {
        let numberOfStops = 3;
        let jsonData = await utilHelper.generateOrderPayload(numberOfStops);
        var res = await testHelper.placeOrder(jsonData);
        orderId = res.body.id;
    });

    it('should fetch order status: "Assigning" ', async function () {
        var res = await testHelper.getOrder(orderId);
        expect(res.status).to.equal(200);
        //verify json schema            
        expect(res.body).to.be.jsonSchema(jsonSchema.jsonGetOrder);
        expect(res.body.status).to.equal(prop.status_assigning);
    });

    it('should fetch order status: "Ongoing" ', async function () {
        await testHelper.takeOrder(orderId);

        var res = await testHelper.getOrder(orderId);
        expect(res.status).to.equal(200);
        //verify json schema            
        expect(res.body).to.be.jsonSchema(jsonSchema.jsonGetOrder);
        expect(res.body.status).to.equal(prop.status_ongoing);
    });

    it('should fetch order status: "Cancelled" ', async function () {
        await testHelper.takeOrder(orderId);
        await testHelper.cancelOrder(orderId);

        var res = await testHelper.getOrder(orderId);
        expect(res.status).to.equal(200);
        //verify json schema            
        expect(res.body).to.be.jsonSchema(jsonSchema.jsonGetOrder);
        expect(res.body.status).to.equal(prop.status_canceled);
    });

    it('should fetch order status: "Completed" ', async function () {
        await testHelper.takeOrder(orderId);
        await testHelper.completeOrder(orderId);

        var res = await testHelper.getOrder(orderId);
        expect(res.status).to.equal(200);
        //verify json schema            
        expect(res.body).to.be.jsonSchema(jsonSchema.jsonGetOrder);
        expect(res.body.status).to.equal(prop.status_completed);
    });

    it('should give an error when passing invalid order id', async function () {
        var res = await testHelper.getOrder(orderId + 100);
        expect(res.status).to.equal(404);
        expect(res.response.text).to.contain(prop.error_404_orderNotFound);
    });

});