'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _behaviors;

var _constants = require('./constants');

var alertTypes = _interopRequireWildcard(_constants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var behaviors = (_behaviors = {}, _defineProperty(_behaviors, alertTypes.CREATE_ALERT, function (state, action) {
  return true;
}), _defineProperty(_behaviors, alertTypes.DISMISS_ALERT, function (state, action) {
  return false;
}), _behaviors);

var initialAlertState = false;

var reducer = function reducer(state, action) {
  var behavior = behaviors[action.type];
  return behavior ? behavior(state, action) : state;
};

var alertReducer = function alertReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var type = action.type;
  var alertName = action.alertName;

  if (state === undefined) return state;
  if (type === alertTypes.INITIALIZE_ALERT) {
    return _extends({}, state, _defineProperty({}, alertName, false));
  }
  if (type === alertTypes.DISMISS_ALL_ALERTS) {
    return Object.keys(state).reduce(function (acc, alert) {
      var prev = Object.assign({}, acc, _defineProperty({}, alert, initialAlertState));
      return prev;
    }, {});
  }

  if (state[alertName] === undefined) return state;
  if (type === alertTypes.DESTROY_ALERT) {
    return Object.keys(state).reduce(function (acc, alert) {
      var prev = alert === alertName ? acc : _extends({}, acc, _defineProperty({}, alert, state[alert]));
      return prev;
    }, {});
  }
  return Object.assign({}, state, _defineProperty({}, alertName, reducer(state[alertName], action)));
};
exports.default = alertReducer;