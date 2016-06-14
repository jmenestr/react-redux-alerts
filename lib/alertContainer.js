'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _actions = require('./actions');

var alertActions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createAlert = function createAlert(config) {
  return function (WrappedComponent) {
    var alertName = config.alertName;

    var AlertContainer = function (_Component) {
      _inherits(AlertContainer, _Component);

      function AlertContainer() {
        _classCallCheck(this, AlertContainer);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AlertContainer).apply(this, arguments));
      }

      _createClass(AlertContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          this.props.actions.initializeAlert(alertName);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          this.props.actions.destroyAlert(alertName);
        }
      }, {
        key: 'close',
        value: function close() {
          this.props.actions.dismissAlert(alertName);
        }
      }, {
        key: 'render',
        value: function render() {
          var _this2 = this;

          if (!this.props.isVisible) return false;
          return _react2.default.createElement(WrappedComponent, { close: function close() {
              return _this2.close();
            } });
        }
      }]);

      return AlertContainer;
    }(_react.Component);

    function mapStateToProps(state) {
      return { isVisible: state.alerts ? state.alerts[alertName] : false };
    };

    function mapDispatchToProps(dispatch) {
      return { actions: (0, _redux.bindActionCreators)(alertActions, dispatch) };
    };
    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AlertContainer);
  };
};

exports.default = createAlert;