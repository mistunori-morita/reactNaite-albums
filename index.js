import React from 'react';
import { Text,AppRegistry } from 'react-native';
import Header from './src/components/header';

// import App from './App';

const App = () => (
  <Header />
);


AppRegistry.registerComponent('albums', () => App);
