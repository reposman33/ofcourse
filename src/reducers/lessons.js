import produce from "immer";
import {
  ADD_LESSON_BEGIN,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_ERROR,
  GET_LESSONS_BEGIN,
  GET_LESSONS_SUCCESS,
  GET_LESSONS_ERROR
} from "../actions";

const initialState = {
  lessons: [],
  adding: false,
  removing: false,
  modalOpen: false,
  getLessons: false,
  addLesson: false
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_LESSON_BEGIN:
      draft.addLesson = true;
      draft.error = null;
      return;
    case ADD_LESSON_SUCCESS:
      draft.addLesson = false;
      return;
    case ADD_LESSON_ERROR:
      draft.addLesson = false;
      draft.error = action.error;
      draft.lessons = [];
      return;
    case GET_LESSONS_BEGIN:
      draft.getLessons = true;
      return;
    case GET_LESSONS_SUCCESS:
      draft.getLessons = false;
      draft.lessons = action.payload;
      return;
    case GET_LESSONS_ERROR:
      draft.getLessons = false;
      draft.error = action.error;
      draft.lessons = [];
      return;
    default:
      return draft;
  }
}, initialState);

export default reducer;
