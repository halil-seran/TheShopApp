
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import cartReducer from './store/reducers/cart';

//import { composeWithDevTools } from 'redux-devtools-extension'; //for reactnative debugger tool

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
});

const store = createStore(rootReducer/*, composeWithDevTools()*/); // for reactnative debugger tool

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'amatic-bold': require('./assets/fonts/Amatic-Bold.ttf'),
    'amatic': require('./assets/fonts/AmaticSC-Regular.ttf'),
    'mont-black': require('./assets/fonts/MontserratAlternates-Black.otf'),
    'mont-light': require('./assets/fonts/MontserratAlternates-Light.otf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => {
        setFontLoaded(true);
      }}
      onError={(err) => console.log(err)} />
    );
}
return (
  <Provider store={store} >
    <ShopNavigator />
    <StatusBar style='light' /* hidden={true} */ />
  </Provider>

);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
