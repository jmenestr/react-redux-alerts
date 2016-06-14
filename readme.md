#react-redux-alerts

>React Redux Alerts is redux based alert system designed for creating resuable alerts across your application. It consists of two things: a redux reducer and a React higher order component to keep track of when your alert is to render.

## Installation
Simply run ```npm i react-redux-alerts --save``` to add to your project.


## Getting started with `react-redux-alerts`
###Step 1
The first thing to do is mount the 'react-redux-alerts' reducer to Redux. This only has to be done at startup. 

```js
import { createStore, combineReducers } from 'redux';
import { reducer as alertsReducer } from 'react-redux-alerts';

const reducers = {
    alerts: alertsReducer
};

const reducer = conbineReducer(reducers);
const store = createStore(reducer);

```

###Step 2
Decoreate your alert component with `createAlert()`. This will provide your component with two props: `message` and `close()`. The first prop is passed in when the `createAction` is called and the second is a function that can be called from within your component to dimiss it. 

```js
// Alert.js

import React from 'react';
import { createAlert } from 'react-redux-alerts';

const MyAlert = ({message, close}) => (
    <div className='myAlert'>
        {message}
        <button onClick={close}> Click to Dismiss me </button>
    </div>
);

/** 
 * This is a wrapper method that connects your alert to the store based on a *alertName key. This is the unique identifier that will allow you to both show the alert and dismiss the alert. 
 */
export default createAlert({
    alertName: 'myAlert'
})(MyAlert);
```

This wrapped component can then be pluged into any container that you want the alert to show up in. To show the notification, simply dispatch the `createAlert` action with two arguments: the `alertName` and the `alertMessage`.
To close, simply call the `dismissAlert` action with the correct key. 

```js
// MyContainer.js

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as alertActions } from 'react-redux-alerts';
import MyAlert from './Alert';

class MyContainer extends Component {
    render() {
        return(
            <div>
                This is my custom container.
                <MyAlert />
                <button onClick={() => this.props.createAlert('myAlert', 'My Alert Message')}
                    Create Alert!
                </button>
                <button onClick={() => this.props.dismissAlert('myAlert')}
                    Dismiss Alert!
                </button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
  return { alerts: bindActionCreators(alertActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyContainer);
```

