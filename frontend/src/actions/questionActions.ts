import axios from 'axios';
import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
} from './type';

export const fetchQuestion = (url) => async (dispatch) => {
  dispatch({ type: FETCH_QUESTION_REQUEST });
  try {
    const response = await axios.post('/api/generate-question', { url });
    dispatch({
      type: FETCH_QUESTION_SUCCESS,
      payload: JSON.parse(response.data),
    });
  } catch (error) {
    dispatch({
      type: FETCH_QUESTION_FAILURE,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
