/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React from 'react';

import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import rootReducer from './reducers/index';
import thunk from 'redux-thunk';

import {BleManager} from 'react-native-ble-plx';

import BLEList from './BLElist';
import BLEservices from './BLEservices'
import BLEservicecharacteristics from './BLEservicecharacteristics'
import BLECharacteristic from './BLEcharacteristics'
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const DeviceManager = new BleManager();

const Stack = createStackNavigator();

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk.withExtraArgument(DeviceManager))));

const App: () => React$Node = () => {


  return (
    <>
      <Provider store={ store }>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="BLEDevices" component={BLEList} />
            <Stack.Screen name="BLEServices" component={BLEservices} />
            <Stack.Screen name="BLECharacteristics" component={BLEservicecharacteristics} />
            <Stack.Screen name="BLECharacteristic" component={BLECharacteristic} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
