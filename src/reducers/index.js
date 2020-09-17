import {
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAIL,
  SHOW_LOADING,
  HIDE_LOADING,
} from '../actionTypes';

const initialState = {
  imagesList: [],
  isLoading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case FETCH_IMAGES_SUCCESS:
      return {
        ...state,
        imagesList: action.payload,
        isLoading: false,
      };
    case FETCH_IMAGES_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
