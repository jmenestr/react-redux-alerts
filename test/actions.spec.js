import * as types from '../src/constants';
import {
  initializeAlert,
  createAlert,
  dismissAlert,
  destroyAlert,
  dismissAllAlerts,
  destroyAllAlerts
} from '../src/actions';
import { should, assert, expect } from 'chai';

const testAlertName = 'testName';

describe('actions', () => {
  it('should create initializeAlert action', () => {
    const initializeAlertAction = 
      initializeAlert(testAlertName);

    assert.deepEqual(initializeAlertAction, {
      type: types.INITIALIZE_ALERT,
      alertName: testAlertName
    });
  });

  it('should create createAlert Aciton', () => {
    const createAlertAction = 
      createAlert(testAlertName);

    assert.deepEqual(createAlertAction, {
      type: types.CREATE_ALERT,
      alertName: testAlertName
    });
  });

  it('should create dismissAlert Action', () => {
    const dismissAlertAction = 
      dismissAlert(testAlertName);

    assert.deepEqual(dismissAlertAction, {
      type: types.DISMISS_ALERT,
      alertName: testAlertName
    });
  });

  it('should create destoryAlert action', () => {
    const destroyAlertAction =
      destroyAlert(testAlertName);

      assert.deepEqual(destroyAlertAction, {
        type: types.DESTROY_ALERT,
        alertName: testAlertName
      });
  });

  it('should create dismissAllAlerts action', () => {
    const dismissAllAlertsAction = 
      dismissAllAlerts();

    assert.deepEqual(dismissAllAlertsAction, {
      type: types.DISMISS_ALL_ALERTS
    });
  });

  it('should create destoryAllAlerts action', () => {
    const destroyAllAlertsAction = 
      destroyAllAlerts();

    assert.deepEqual(destroyAllAlertsAction, {
      type: types.DESTROY_ALL_ALERTS
    });
  });
});
