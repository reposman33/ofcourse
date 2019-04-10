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
	GET_COURSES_ERROR,
	OPEN_NEW_COURSE_MODAL,
	CLOSE_NEW_COURSE_MODAL
} from "../actions";

const initialState = {
	courses: [],
	adding: false,
	removing: false,
	modalOpen: false
};

const reducer = produce((draft, action) => {
	switch (action.type) {
		case ADD_COURSE_BEGIN:
			draft.adding = true;
			return;
		case ADD_COURSE_SUCCESS:
			draft.adding = false;
			draft.courses.push(action.payload);
			draft.modalOpen = false;
			return;
		case ADD_COURSE_ERROR:
			draft.adding = false;
			draft.error = `${action.error.status}: ${action.error.statusText}`;
			return;
		case REMOVE_COURSE_BEGIN:
			draft.removing = true;
			return;
		case REMOVE_COURSE_SUCCESS:
			draft.removing = false;
			return;
		case REMOVE_COURSE_ERROR:
			draft.error = `${action.error.status}: ${action.error.statusText}`;
			return;
		case GET_COURSES_BEGIN:
			draft.loading = true;
			return;
		case GET_COURSES_SUCCESS:
			draft.courses = action.payload;
			draft.loading = false;
			return;
		case GET_COURSES_ERROR:
			draft.error = `${action.error.status}: ${action.error.statusText}`;
			draft.loading = false;
			draft.courses = [];
			return;
		case OPEN_NEW_COURSE_MODAL:
			draft.modalOpen = true;
			return;
		case CLOSE_NEW_COURSE_MODAL:
			draft.modalOpen = false;
			return;
		default:
			return draft;
	}
}, initialState);

export default reducer;
