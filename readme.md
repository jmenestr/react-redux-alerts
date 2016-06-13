#react-redux-alerts


## Installation
```npm i react-redux-alerts --save```

## The Gist
A redux based alert system designed for creating resuable alerts across your application. 

```js
// Alert.js

import React from 'react';
import { createAlert } from 'react-redux-alerts';

const MyAlert = () => (
    <div>
        This is my custom alert message.
    </div>
);

/** 
 * This is a wrapper method that connects your alert to the store based on a alertName key. This is the unique identifier that will allow you to both show the alert and dismiss the alert. 
 */
export default createAlert({
    alertName: 'myAlert'
})(MyAlert);
```

This wrapped component can then be pluged into any container that you want the alert to show up in.

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
                <button onClick={() => this.props.createAlert('myAlert')}
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
Using the react-redux-alert actions, you can dismiss or create notifications by passing the appropriate key to the action.
