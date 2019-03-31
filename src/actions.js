import { createCourse, deleteCourse, getCourses } from "./api";
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

const addCourse = name => (dispatch, getState) => {
  dispatch({ type: ADD_COURSE_BEGIN });
  createCourse(name)
    .then(courseData =>
      dispatch({ type: ADD_COURSE_SUCCESS, payload: courseData })
    )
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
    .then(res => res.json())
    .then(courseData =>
      dispatch({ type: GET_COURSES_SUCCESS, payload: courseData })
    )
    .catch(error => dispatch({ type: GET_COURSES_ERROR, error }));
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
  addCourse,
  removeCourse,
  loadCourses
};
