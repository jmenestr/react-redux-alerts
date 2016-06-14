import * as alertTypes from './constants';

const initialState = {isVisible: false, message: '' };

const behaviors = {
  [alertTypes.CREATE_ALERT](state, action) {
    const { alertMessage } = action;
    return { isVisible: true, message: alertMessage };
  },
  [alertTypes.DISMISS_ALERT](state, action) {
    return initialState;
  }
};

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
        [alertName]: initialState
      };
  }
  if (type === alertTypes.DISMISS_ALL_ALERTS) {
    return Object.keys(state).reduce((acc, alert) => 
      Object.assign({}, acc, { [alert]: initialState }), 
    {});
  }

  if (state[alertName] === undefined) return state;
  if (type === alertTypes.DESTROY_ALERT) {
    return Object.keys(state).reduce((acc, alert) => 
      alert === alertName ? acc : { ...acc, [alert]: state[alert] },
    {});
  }
  return Object.assign({}, state, {
    [alertName]: reducer(state[alertName], action) 
  });
};
export default alertReducer;