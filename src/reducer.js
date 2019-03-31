import produce from "immer";
import {
  ADD_COURSE_BEGIN,
  ADD_COURSE_SUCCESS,
  ADD_COURSE_ERROR,
  REMOVE_COURSE_BEGIN,
  REMOVE_COURSE_SUCCESS,
  REMOVE_COURSE_ERROR,
  GET_COURSES_BEGIN,
  GET_COURSES_SUCCESS,
  GET_COURSES_ERROR
} from "./actions";

const initialState = { courses: [], adding: false, removing: false };

const reducer = produce((draft, action) => {
  switch (action.type) {
    case ADD_COURSE_BEGIN:
      draft.adding = true;
      return;
    case ADD_COURSE_SUCCESS:
      draft.adding = false;
      draft.courses.push(action.payload);
      return;
    case REMOVE_COURSE_BEGIN:
      draft.removing = true;
      return;
    case REMOVE_COURSE_SUCCESS:
      draft.removing = false;
      return;
    case REMOVE_COURSE_ERROR:
      return;
    case GET_COURSES_BEGIN:
      draft.loading = true;
      return;
    case GET_COURSES_SUCCESS:
      draft.courses = action.payload;
      // draft.loading = false;
      return;
    default:
      return draft;
  }
}, initialState);

export default reducer;
