import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger';
import Main from './Main';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const store = createStoreWithMiddleware(rootReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <Main />}
      </Provider>
    );
  }
}
