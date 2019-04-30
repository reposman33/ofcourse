import {
	createCourse,
	deleteCourse,
	getCourses,
	createLesson,
	getLessons
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
const GET_LESSONS_BEGIN = "GET_LESSONS_BEGIN";
const GET_LESSONS_SUCCESS = "GET_LESSONS_SUCCESS";
const GET_LESSONS_ERROR = "GET_LESSONS_ERROR";
const openNewCourseModal = () => ({ type: OPEN_NEW_COURSE_MODAL });
const closeNewCourseModal = () => ({ type: CLOSE_NEW_COURSE_MODAL });

const verifyResponse = res => {
	if (!res.ok) {
		throw res;
	} else {
		return res.json();
	}
};

const addCourse = ({ name, price }) => (dispatch, getState) => {
	dispatch({ type: ADD_COURSE_BEGIN });
	createCourse({ name, price })
		.then(res => verifyResponse(res))
		.then(courseData => {
			dispatch({ type: ADD_COURSE_SUCCESS, payload: courseData });
			dispatch({ type: CLOSE_NEW_COURSE_MODAL });
		})
		.catch(error => dispatch({ type: ADD_COURSE_ERROR, error }));
};

const removeCourse = course => (dispatch, getState) => {
	dispatch({ type: REMOVE_COURSE_BEGIN });
	deleteCourse(course)
		.then(res => dispatch({ type: REMOVE_COURSE_SUCCESS }))
		.catch(error => dispatch({ type: REMOVE_COURSE_ERROR, error }));
};

const loadCourses = () => (dispatch, getState) => {
	dispatch({ type: GET_COURSES_BEGIN });
	getCourses()
		.then(res => verifyResponse(res))
		.then(courseData =>
			dispatch({ type: GET_COURSES_SUCCESS, payload: courseData })
		)
		.catch(error => dispatch({ type: GET_COURSES_ERROR, error }));
};

const addLesson = (name, courseId) => (dispatch, getState) => {
	dispatch({ type: ADD_LESSON_BEGIN });
	createLesson(name, courseId)
		.then(res => verifyResponse())
		.then(lessons =>
			dispatch({ type: ADD_LESSON_SUCCESS, payload: lessons })
		)
		.catch(error => dispatch({ type: ADD_LESSON_ERROR, error }));
};

const loadLessons = id => {
	return dispatch => {
		dispatch({ type: GET_LESSONS_BEGIN });
		getLessons(id)
			.then(verifyResponse)
			.then(lessons =>
				dispatch({ type: GET_LESSONS_SUCCESS, payload: lessons })
			)
			.catch(error => dispatch({ type: GET_LESSONS_ERROR, error }));
	};
};

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
	GET_LESSONS_ERROR,
	GET_LESSONS_BEGIN,
	GET_LESSONS_SUCCESS,
	openNewCourseModal,
	closeNewCourseModal,
	addCourse,
	removeCourse,
	loadCourses,
	addLesson,
	loadLessons
};
