const PREFIX = "/api";

const postData = (url, data = {}) => fetchWithData(url, data, "POST");

const putData = (url, data = {}) => fetchWithData(url, data, "PUT");

const fetchWithData = (url, data = {}, method = "POST") => {
	return fetch(url, {
		method: method,
		headers: { "content-type": "Application/Json" },
		body: JSON.stringify(data)
	}).then(response => response);
};

const getCourses = () => fetch(PREFIX + "/courses");

const createCourse = course => postData(PREFIX + "/courses", course);

const deleteCourse = course => deleteData(PREFIX + "/courses", course);

const getLessons = id => fetch(PREFIX + `/lessons?courseId=${id}`);

const createLesson = lesson => postData(PREFIX + "/lessons", lesson);

const saveLesson = lesson => putData(PREFIX + `/lessons/${lesson.id}`, lesson);

const deleteLesson = lessonId => deleteData(PREFIX + `/lessons/${lessonId}`);

const deleteData = (url, data = {}) => fetchWithData(url, data, "DELETE");

export {
	createCourse,
	deleteCourse,
	getCourses,
	createLesson,
	getLessons,
	saveLesson,
	deleteLesson
};
