import {
    FETCH_QUESTION_REQUEST,
    FETCH_QUESTION_SUCCESS,
    FETCH_QUESTION_FAILURE,
  } from '../actions/type';
  
  const initialState = {
    loading: false,
    question: '',
    options: [],
    error: null,
  };
  
  export const questionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_QUESTION_REQUEST:
        return { ...state, loading: true };
      case FETCH_QUESTION_SUCCESS:
        return {
          loading: false,
          question: action.payload.question,
          options: action.payload.options,
          error: null,
        };
      case FETCH_QUESTION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  