import produce from "immer";
import {
	ADD_LESSON_BEGIN,
	ADD_LESSON_SUCCESS,
	ADD_LESSON_ERROR,
	LOAD_LESSONS_BEGIN,
	LOAD_LESSONS_SUCCESS,
	LOAD_LESSONS_ERROR,
	SAVE_LESSON_BEGIN,
	SAVE_LESSON_SUCCESS,
	SAVE_LESSON_ERROR,
	REMOVE_LESSON_BEGIN,
	REMOVE_LESSON_SUCCESS,
	REMOVE_LESSON_ERROR,
	SET_LESSONMARKDOWN,
	SET_LESSONMARKDOWN_ERROR
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
		case LOAD_LESSONS_SUCCESS:
			draft.loading = false;
			action.payload.forEach(lesson => {
				draft.lessons[lesson.id] = lesson;
			});
			return;
		case LOAD_LESSONS_BEGIN:
			draft.loading = true;
			draft.error = null;
			return;
		case LOAD_LESSONS_ERROR:
			draft.loading = false;
			draft.error = action.error;
			return;
		case ADD_LESSON_BEGIN:
		case SAVE_LESSON_BEGIN:
			draft.saving = true;
			draft.error = null;
			return;
		case ADD_LESSON_SUCCESS:
			draft.saving = false;
			draft.lessons.push(action.payload);
			return;
		case ADD_LESSON_ERROR:
		case SAVE_LESSON_ERROR:
			draft.saving = false;
			draft.error = action.error;
			return;
		case SAVE_LESSON_SUCCESS:
			draft.saving = false;
			draft.lessons[action.payload.id] = action.payload;
			return;
		case REMOVE_LESSON_BEGIN:
			draft.deleting = true;
			return;
		case REMOVE_LESSON_SUCCESS:
			draft.deleting = false;
			delete draft.lessons[action.payload];
			return;
		case REMOVE_LESSON_ERROR:
			draft.deleting = false;
			draft.error = action.payload.error;
			return;
		case SET_LESSONMARKDOWN:
			draft.lessons[action.payload.lesson.id].markdown =
				action.payload.markdown;
			return;
		case SET_LESSONMARKDOWN_ERROR:
			draft.error = action.payload.error;
			return;
		default:
			return;
	}
}, initialState);

export default reducer;
