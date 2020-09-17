import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import Carousel from 'react-native-banner-carousel';

const {height, width} = Dimensions.get('window');
const screenWidth = width;

const ImageSlider = ({
  imagesList,
  imageContainerStyle,
  authorNameStyle,
  imageStyle,
}) => {
  return (
    <Carousel index={0} loop pageSize={screenWidth} showsPageIndicator={false}>
      {imagesList.map((item, index) => (
        <View key={index} style={imageContainerStyle}>
          <Text style={authorNameStyle}>{item.author}</Text>
          <Image style={imageStyle} source={{uri: item.image}} />
        </View>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
