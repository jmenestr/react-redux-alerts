import * as alertTypes from './constants';

const behaviors = {
  [alertTypes.CREATE_ALERT](state, action) {
    return true;
  },
  [alertTypes.DISMISS_ALERT](state, action) {
    return false;
  }
};

const initialAlertState = false;

const reducer = (state, action) => {
  const behavior = behaviors[action.type];
  return behavior ? behavior(state, action) : state;
}


const alertReducer = (state = {}, action = {}) => {
  const {type, alertName } = action;
  if (state === undefined) return state;
  if (type === alertTypes.INITIALIZE_ALERT) {
      return {
        ...state,
        [alertName]: false
      };
  }
  if (type === alertTypes.DISMISS_ALL_ALERTS) {
    return Object.keys(state).reduce((acc, alert) => {
      const prev = 
        Object.assign({}, acc, { [alert]: initialAlertState });
      return prev;
    }, {});
  }

  if (state[alertName] === undefined) return state;
  if (type === alertTypes.DESTROY_ALERT) {
    return Object.keys(state).reduce((acc, alert) => {
      const prev = alert === alertName ? 
        acc : { ...acc, [alert]: state[alert] };
      return prev;
    }, {});
  }
  return Object.assign({}, state, {
    [alertName]: reducer(state[alertName], action) 
  });
};
export default alertReducer;