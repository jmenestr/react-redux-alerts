'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.destroyAllAlerts = exports.dismissAllAlerts = exports.destroyAlert = exports.dismissAlert = exports.createAlert = exports.initializeAlert = undefined;

var _constants = require('./constants');

var alertConstants = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initializeAlert = exports.initializeAlert = function initializeAlert(alertName) {
  return { type: alertConstants.INITIALIZE_ALERT, alertName: alertName };
};

var createAlert = exports.createAlert = function createAlert(alertName, alertMessage) {
  return { type: alertConstants.CREATE_ALERT, alertName: alertName, alertMessage: alertMessage };
};

var dismissAlert = exports.dismissAlert = function dismissAlert(alertName) {
  return { type: alertConstants.DISMISS_ALERT, alertName: alertName };
};

var destroyAlert = exports.destroyAlert = function destroyAlert(alertName) {
  return { type: alertConstants.DESTROY_ALERT, alertName: alertName };
};

var dismissAllAlerts = exports.dismissAllAlerts = function dismissAllAlerts() {
  return { type: alertConstants.DISMISS_ALL_ALERTS };
};

var destroyAllAlerts = exports.destroyAllAlerts = function destroyAllAlerts() {
  return { type: alertConstants.DESTROY_ALL_ALERTS };
};