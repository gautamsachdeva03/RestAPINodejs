//*******Common properties*********
const baseURL = "http://localhost:51544/v1/orders"
const baseDistanceMeters = 2000
const metersDividend = 200
const baseFare = 20
const priceMultiplier = 5
const baseFareLateNight = 30
const priceMultiplierLateNight = 8
const currencyUnit = "HKD"

//**********Status codes*************
const status_canceled = "CANCELLED"
const status_completed = "COMPLETED"
const status_assigning = "ASSIGNING"
const status_ongoing = "ONGOING"

//**********Error codes*************
const error_404_orderNotFound = "ORDER_NOT_FOUND"
const error_422_statusAlreadyCompleted = "Order status is COMPLETED already"
const error_422_statusNotOnGoing = "Order status is not ONGOING"
const error_422_statusNotOnAssigning = "Order status is not ASSIGNING"
const error_400_errorInStopsField = "error in field(s): stops"
const error_400_pastOrder = "field orderAt is behind the present time"
const error_400_errorInLatLngField = "error in field(s): lng, lat"

module.exports = {
    baseURL: baseURL,
    baseDistanceMeters: baseDistanceMeters,
    metersDividend: metersDividend,
    baseFare: baseFare,
    priceMultiplier: priceMultiplier,
    baseFareLateNight: baseFareLateNight,
    priceMultiplierLateNight: priceMultiplierLateNight,
    currencyUnit: currencyUnit,
    status_canceled: status_canceled,
    status_completed: status_completed,
    status_assigning: status_assigning,
    status_ongoing: status_ongoing,
    error_404_orderNotFound: error_404_orderNotFound,
    error_422_statusAlreadyCompleted: error_422_statusAlreadyCompleted,
    error_422_statusNotOnGoing: error_422_statusNotOnGoing,
    error_422_statusNotOnAssigning: error_422_statusNotOnAssigning,
    error_400_errorInStopsField: error_400_errorInStopsField,
    error_400_pastOrder: error_400_pastOrder,
    error_400_errorInLatLngField: error_400_errorInLatLngField
}