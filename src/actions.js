import {
	createCourse,
	deleteCourse,
	getCourses,
	createLesson,
	getLessons,
	saveLesson,
	deleteLesson,
	loginUser,
	createUser
} from "./api";
const REMOVE_COURSE = "REMOVE_COURSE";
const ADD_COURSE_BEGIN = "ADD_COURSE_BEGIN";
const ADD_COURSE_SUCCESS = "ADD_COURSE_SUCCESS";
const ADD_COURSE_ERROR = "ADD_COURSE_ERROR";
const REMOVE_COURSE_BEGIN = "REMOVE_COURSE_BEGIN";
const REMOVE_COURSE_SUCCESS = "REMOVE_COURSE_SUCCESS";
const REMOVE_COURSE_ERROR = "REMOVE_COURSE_ERROR";
const GET_COURSES_BEGIN = "GET_COURSES_BEGIN";
const GET_COURSES_SUCCESS = "GET_COURSES_SUCCESS";
const GET_COURSES_ERROR = "GET_COURSES_ERROR";
const OPEN_NEW_COURSE_MODAL = "OPEN_NEW_COURSE_MODAL";
const CLOSE_NEW_COURSE_MODAL = "CLOSE_NEW_COURSE_MODAL";
const ADD_LESSON_BEGIN = "ADD_LESSON_BEGIN";
const ADD_LESSON_SUCCESS = "ADD_LESSON_SUCCESS";
const ADD_LESSON_ERROR = "ADD_LESSON_ERROR";
const REMOVE_LESSON_BEGIN = "REMOVE_LESSON_BEGIN";
const REMOVE_LESSON_SUCCESS = "REMOVE_LESSON_SUCCESS";
const REMOVE_LESSON_ERROR = "REMOVE_LESSON_ERROR";
const LOAD_LESSONS_BEGIN = "LOAD_LESSONS_BEGIN";
const LOAD_LESSONS_SUCCESS = "LOAD_LESSONS_SUCCESS";
const LOAD_LESSONS_ERROR = "LOAD_LESSONS_ERROR";
const SAVE_LESSON_BEGIN = "SAVE_LESSON_BEGIN";
const SAVE_LESSON_SUCCESS = "SAVE_LESSON_SUCCESS";
const SAVE_LESSON_ERROR = "SAVE_LESSON_ERROR";
const SET_LESSONMARKDOWN = "SET_LESSONMARKDOWN";
const SET_LESSONMARKDOWN_ERROR = "SET_LESSONMARKDOWN_ERROR";
const TOGGLE_PREVIEW_MODE = "TOGGLE_PREVIEW_MODE";
const LOGIN_BEGIN = "LOGIN_BEGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const SIGNUP_BEGIN = "SIGNUP_BEGIN";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_ERROR = "SIGNUP_ERROR";

const openNewCourseModal = () => ({ type: OPEN_NEW_COURSE_MODAL });
const closeNewCourseModal = () => ({ type: CLOSE_NEW_COURSE_MODAL });

const addCourse = ({ name, price }) => (dispatch, getState) => {
	dispatch({ type: ADD_COURSE_BEGIN });
	createCourse({ name, price })
		.then(courseData => {
			dispatch({ type: ADD_COURSE_SUCCESS, payload: courseData });
			dispatch({ type: CLOSE_NEW_COURSE_MODAL });
		})
		.catch(error => dispatch({ type: ADD_COURSE_ERROR, payload: error }));
};

const removeCourse = course => (dispatch, getState) => {
	dispatch({ type: REMOVE_COURSE_BEGIN });
	deleteCourse(course)
		.then(res => dispatch({ type: REMOVE_COURSE_SUCCESS }))
		.catch(error =>
			dispatch({ type: REMOVE_COURSE_ERROR, payload: error })
		);
};

const loadCourses = () => (dispatch, getState) => {
	dispatch({ type: GET_COURSES_BEGIN });
	getCourses()
		.then(courseData =>
			dispatch({ type: GET_COURSES_SUCCESS, payload: courseData })
		)
		.catch(error => dispatch({ type: GET_COURSES_ERROR, payload: error }));
};

const updateLesson = lesson => (dispatch, getState) => {
	dispatch({ type: SAVE_LESSON_BEGIN });
	saveLesson(lesson)
		.then(lesson =>
			dispatch({ type: SAVE_LESSON_SUCCESS, payload: lesson })
		)
		.catch(error => dispatch({ type: SAVE_LESSON_ERROR, payload: error }));
};

const addLesson = lesson => (dispatch, getState) => {
	dispatch({ type: ADD_LESSON_BEGIN });
	createLesson(lesson)
		.then(lesson => dispatch({ type: ADD_LESSON_SUCCESS, payload: lesson }))
		.catch(error => dispatch({ type: ADD_LESSON_ERROR, payload: error }));
};

const loadLessons = id => (dispatch, getState) => {
	dispatch({ type: LOAD_LESSONS_BEGIN });
	getLessons(id)
		.then(lessons =>
			dispatch({ type: LOAD_LESSONS_SUCCESS, payload: lessons })
		)
		.catch(error => dispatch({ type: LOAD_LESSONS_ERROR, payload: error }));
};

const removeLesson = lessonId => (dispatch, getState) => {
	dispatch({ type: REMOVE_LESSON_BEGIN });
	deleteLesson(lessonId)
		.then(dispatch({ type: REMOVE_LESSON_SUCCESS, payload: lessonId }))
		.catch(error =>
			dispatch({ type: REMOVE_LESSON_ERROR, payload: error })
		);
};

const onLogin = (username, password) => dispatch => {
	dispatch({ type: LOGIN_BEGIN });
	loginUser(username, password)
		.then(user =>
			dispatch({
				type: LOGIN_SUCCESS,
				payload: user
			})
		)
		.catch(error => dispatch({ type: LOGIN_ERROR, payload: error }));
};

const onSignUp = (username, password) => dispatch => {
	dispatch({ type: SIGNUP_BEGIN });
	createUser(username, password)
		.then(user => dispatch({ type: SIGNUP_SUCCESS, payload: user }))
		.catch(error => dispatch({ type: SIGNUP_ERROR, payload: error }));
};

let timeoutId = null;
const setLessonMarkdown = (lesson, markdown) => (dispatch, getState) => {
	dispatch({
		type: SET_LESSONMARKDOWN,
		payload: { lesson, markdown }
	});
	// throttle saving the new lessonname
	if (!timeoutId) {
		timeoutId = setTimeout(() => {
			const latest = getState().lessons.lessons[lesson.id];
			dispatch(updateLesson(latest));
			clearTimeout(timeoutId);
			timeoutId = null;
		}, 500);
	}
};

const togglepreviewMode = () => ({ type: TOGGLE_PREVIEW_MODE });

export {
	REMOVE_COURSE,
	ADD_COURSE_BEGIN,
	ADD_COURSE_ERROR,
	ADD_COURSE_SUCCESS,
	REMOVE_COURSE_BEGIN,
	REMOVE_COURSE_SUCCESS,
	REMOVE_COURSE_ERROR,
	GET_COURSES_BEGIN,
	GET_COURSES_SUCCESS,
	GET_COURSES_ERROR,
	OPEN_NEW_COURSE_MODAL,
	CLOSE_NEW_COURSE_MODAL,
	ADD_LESSON_BEGIN,
	ADD_LESSON_ERROR,
	ADD_LESSON_SUCCESS,
	LOAD_LESSONS_ERROR,
	LOAD_LESSONS_BEGIN,
	LOAD_LESSONS_SUCCESS,
	SAVE_LESSON_BEGIN,
	SAVE_LESSON_SUCCESS,
	SAVE_LESSON_ERROR,
	REMOVE_LESSON_BEGIN,
	REMOVE_LESSON_SUCCESS,
	REMOVE_LESSON_ERROR,
	SET_LESSONMARKDOWN,
	SET_LESSONMARKDOWN_ERROR,
	TOGGLE_PREVIEW_MODE,
	LOGIN_BEGIN,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SIGNUP_BEGIN,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
	openNewCourseModal,
	closeNewCourseModal,
	addCourse,
	removeCourse,
	loadCourses,
	addLesson,
	loadLessons,
	updateLesson,
	removeLesson,
	setLessonMarkdown,
	togglepreviewMode,
	onLogin,
	onSignUp
};
