/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Provider} from 'react-redux';
import Main from './src/main';
import configureStore from './store';

const store = configureStore();

const App: () => React$Node = () => {
  return (
    <>
      <Provider store={store}>
        <Main />
      </Provider>
    </>
  );
};

export default App;
