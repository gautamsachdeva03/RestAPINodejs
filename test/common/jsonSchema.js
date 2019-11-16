const jsonPlaceOrder = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "drivingDistancesInMeters": {
            "type": "array",
            "items": [
                {
                    "type": "integer"
                }
            ]
        },
        "fare": {
            "type": "object",
            "properties": {
                "amount": {
                    "type": "string"
                },
                "currency": {
                    "type": "string"
                }
            },
            "required": [
                "amount",
                "currency"
            ]
        }
    },
    "required": [
        "id",
        "drivingDistancesInMeters",
        "fare"
    ]
}

const jsonGetOrder = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "stops": {
            "type": "array",
            "items": [
                {
                    "type": "object",
                    "properties": {
                        "lat": {
                            "type": "number"
                        },
                        "lng": {
                            "type": "number"
                        }
                    },
                    "required": [
                        "lat",
                        "lng"
                    ]
                }
            ]
        },
        "drivingDistancesInMeters": {
            "type": "array",
            "items": [
                {
                    "type": "integer"
                }
            ]
        },
        "fare": {
            "type": "object",
            "properties": {
                "amount": {
                    "type": "string"
                },
                "currency": {
                    "type": "string"
                }
            },
            "required": [
                "amount",
                "currency"
            ]
        },
        "status": {
            "type": "string"
        },
        "orderDateTime": {
            "type": "string"
        },
        "createdTime": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "stops",
        "drivingDistancesInMeters",
        "fare",
        "status",
        "orderDateTime",
        "createdTime"
    ]
}

const jsonInvalid = {
    "type": "object",
    "properties": {
        "message": {
            "type": "string"
        }
    },
    "required": [
        "message"
    ]
}

const jsonTakeOrder = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "status": {
            "type": "string"
        },
        "ongoingTime": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "status",
        "ongoingTime"
    ]
}

const jsonCancelOrder = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "status": {
            "type": "string"
        },
        "cancelledAt": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "status",
        "cancelledAt"
    ]
}

const jsonCompleteOrder = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "status": {
            "type": "string"
        },
        "completedAt": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "status",
        "completedAt"
    ]
}

module.exports.jsonPlaceOrder = jsonPlaceOrder;
module.exports.jsonGetOrder = jsonGetOrder;
module.exports.jsonInvalid = jsonInvalid;
module.exports.jsonTakeOrder = jsonTakeOrder;
module.exports.jsonCancelOrder = jsonCancelOrder;
module.exports.jsonCompleteOrder = jsonCompleteOrder;