import reducer from '../src/reducer';
import {
  initializeAlert,
  createAlert,
  dismissAlert,
  destroyAlert,
  dismissAllAlerts,
  destroyAllAlerts
} from '../src/actions';
import { should, assert, expect } from 'chai';

const testAlert = 'testAlert';
const anotherTestAlert = 'anotherTestAlert';
const initialState = {isVisible: false, message: ''};

const defaultState = {
  [testAlert]: { isVisible: true, message: testAlert},
  [anotherTestAlert]: { isVisible: true, message: anotherTestAlert },
  yetAnotherTestAlert: { isVisible: false, message: anotherTestAlert }
};

const randomKey = 'randomKey';

describe('reducer', () => {
  it('should initialize an alert to false', () => {
    const initializeAlertAction = initializeAlert(testAlert);

    const newState = reducer({}, initializeAlertAction);

    assert.deepEqual(newState, {
      [testAlert]: initialState
    });

  });

  it('should delete an alert that is destroyed', () => {
    const alerts = { [testAlert]: { isVisible: true, message: testAlert} };
    const destoryAlertAction = destroyAlert(testAlert);

    const newState = reducer(alerts, destoryAlertAction);

    assert.deepEqual(newState, {});
  });

  it('should should set an alert to true with the specified name', () => {
    const alerts =  { 
      [testAlert]: { isVisible: false, message: ''},
      [anotherTestAlert]: { isVisible: false, message: ''} 
    }; 

    const createAlertAction = createAlert(testAlert, testAlert);
    const newState = reducer(alerts, createAlertAction);

    assert.deepEqual(newState, {
      [testAlert]: { isVisible: true, message: testAlert},
      [anotherTestAlert]: { isVisible: false, message: ''}
    });
  });
  it('should dismiss one alerts with the specified name', () => {
    const alerts =  { 
      [testAlert]: { isVisible: true, message: testAlert},
      [anotherTestAlert]: { isVisible: true, message: anotherTestAlert }
    };

    const dismissAlertAction = dismissAlert(testAlert);

    const newState = reducer(alerts, dismissAlertAction);

    assert.deepEqual(newState, {
      [testAlert]: { isVisible: false, message: testAlert},
      [anotherTestAlert]: { isVisible: true, message: anotherTestAlert }
    });
  });

  it('should dismiss all alerts', () => {
    const alerts =  { 
      [testAlert]: { isVisible: true, message: testAlert},
      [anotherTestAlert]: { isVisible: true, message: anotherTestAlert }
    };

    const dismissAllAlertsAction = dismissAllAlerts();
    const newState = reducer(alerts, dismissAllAlertsAction);

    assert.deepEqual(newState, { 
      [testAlert]: { isVisible: false, message: ''},
      [anotherTestAlert]: { isVisible: false, message: '' }
    });
  });

  it('should return default state for unrecongizedAction action', () => {
    const unrecongizedAction =  {
    type: 'UNRECGONIZED ACTION',
    alertName: testAlert
  };
    const newState = reducer(defaultState, unrecongizedAction);
    assert.deepEqual(newState, defaultState);
  });

  it('createAlert should return defaultState for unrecongized key', () => {
    const initAction = createAlert(randomKey);
    const newState = reducer(defaultState, initAction);
    assert.deepEqual(newState, defaultState);
  });

  it('dismissAlert should return defaultState for unrecongized key', () => {
    const initAction = dismissAlert(randomKey);
    const newState = reducer(defaultState, initAction);
    assert.deepEqual(newState, defaultState);
  });

  it('destoryAlert should return defaultState for unrecongized key', () => {
    const destoryAction = destroyAlert(randomKey);
    const newState = reducer(defaultState, destoryAction);
    assert.deepEqual(newState, defaultState);
  });

});