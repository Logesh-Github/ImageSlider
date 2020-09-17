import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  AppState,
} from 'react-native';
import ImageSlider from './components/ImageSlider';
import {connect} from 'react-redux';
import {fetchImages, shuffleImages, showLoading, hideLoading} from './actions';

const {height, width} = Dimensions.get('window');
const screenWidth = width;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      appState: AppState.currentState,
    };
    console.disableYellowBox = true;
  }

  componentDidMount() {
    const {fetchImages} = this.props;
    fetchImages();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    const {shuffleImages, imagesList, showLoading} = this.props;
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      showLoading();
      shuffleImages(imagesList);
    }
    this.setState({appState: nextAppState});
  };

  render() {
    const {isLoading, imagesList} = this.props;
    if (isLoading) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'small'} color={'red'} />
        </View>
      );
    }
    return (
      <SafeAreaView style={{flex: 1}}>
        <ImageSlider
          imagesList={imagesList}
          imageContainerStyle={styles.imgView}
          authorNameStyle={styles.authorName}
          imageStyle={styles.image}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  const {isLoading, imagesList} = state.main;
  return {
    isLoading,
    imagesList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchImages: () => {
      dispatch(fetchImages());
    },
    shuffleImages: (imageList) => {
      dispatch(shuffleImages(imageList));
    },
    showLoading: () => {
      dispatch(showLoading());
    },
    hideLoading: () => {
      dispatch(hideLoading());
    },
  };
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 300,
    width: 200,
  },
  imgView: {alignSelf: 'center'},
  authorName: {alignSelf: 'center'},
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
