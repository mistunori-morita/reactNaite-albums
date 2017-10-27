import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';


const AlbumDetail = (props) => {
  return(
    <Card>
      <CardSection>
        <View></View>
        <View style={styles.haederContentStyle}>
          <Text>{props.album.title}</Text>
          <Text>{props.album.artist}</Text>
        </View>
      </CardSection>
    </Card>
  );
};

const styles = {
  haederContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
};

export default AlbumDetail;
