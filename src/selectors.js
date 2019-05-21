import { createSelector } from "reselect";

const getLessons = (state, props) => state.lessons.lessons;
const parseCourseId = (state, props) => parseInt(props.courseId, 10);
const getCourses = state => state.courses.courses;

const getLessonsByCourseId = createSelector(
	getLessons,
	parseCourseId,
	(lessons, courseId) =>
		lessons.filter(lesson => lesson.courseId === courseId)
);

const getCourseById = createSelector(
	getCourses,
	parseCourseId,
	(courses, id) => courses.find(course => course.id === id)
);

// delete lesson from lessons
const deleteLesson = (lessons, id) =>
	lessons.filter(lesson => lesson.id !== id);

// update lesson in lessons
const updateLessons = (lessons, updatedLesson) =>
	lessons.map(lesson =>
		lesson.id === updatedLesson.id ? updatedLesson : lesson
	);
export {
	getCourseById,
	getCourses,
	getLessonsByCourseId,
	deleteLesson,
	updateLessons
};
