// Improt libraries for maiking a components
import React from 'react';
import { Text,View } from 'react-native';


//Make a component
const Header = () => {
  const { textStyle ,viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>Albums!</Text>
    </View>
  );
};

const styles = {
  viewStyle:{
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {widt: 0, height: 2},
    shadowOpacity: 0.2
  },
  textStyle:{
    fontSize: 20
  }
};
// Make the component available to other parts of the App
export default Header;
