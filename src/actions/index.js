import Constants from '../common/constants';
import {
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAIL,
  SHOW_LOADING,
  HIDE_LOADING,
} from '../actionTypes';

export const showLoading = () => {
  return {
    type: SHOW_LOADING,
  };
};

export const hideLoading = () => {
  return {
    type: HIDE_LOADING,
  };
};

export const fetchImageSuccess = (data) => {
  return {
    type: FETCH_IMAGES_SUCCESS,
    payload: data,
  };
};

export const fetchImageFail = () => {
  return {
    type: FETCH_IMAGES_FAIL,
  };
};

export const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const getResizedImage = async (list) => {
  let imageList = [];
  await Promise.all(
    list.map(async (item, index) => {
      await fetch(`${Constants.imageURL}${item.id}`)
        .then((res) => {
          let obj = {};
          obj.id = item.id;
          obj.author = item.author;
          obj.image = res.url;
          imageList.push(obj);
        })
        .catch((error) => {
          console.log(error);
        });
    }),
  );
  return imageList;
};

export const fetchImages = () => {
  return (dispatch) => {
    return fetch(Constants.baseURL)
      .then((res) => res.json())
      .then(async (responseJson) => {
        let imageList = await getResizedImage(responseJson);
        return dispatch(fetchImageSuccess(imageList));
      })
      .catch((error) => {
        return dispatch(fetchImageFail());
      });
  };
};

export const shuffleImages = (imageList) => {
  return (dispatch) => {
    let shuffledImagesList = shuffle(imageList);
    return dispatch(fetchImageSuccess(shuffledImagesList));
  };
};
