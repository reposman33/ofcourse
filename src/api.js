const PREFIX = "/api";
const postData = (url = "", data = {}) => fetchWithData(url, data, "POST");
const putData = (url = "", data = {}) => fetchWithData(url, data, "PUT");
const fetchWithData = (url = "", data = {}, method = "POST") => {
	return fetch(url, {
		method: method,
		headers: { "content-type": "Application/Json" },
		body: JSON.stringify(data)
	}).then(response => response);
};

const createCourse = course => postData(PREFIX + "/courses", course);

const createLesson = (name, courseId) =>
	postData(PREFIX + "/lessons", { name, courseId });

const saveLesson = lesson => putData(PREFIX + `/lessons/${lesson.id}`, lesson);

const deleteCourse = course => deleteData(PREFIX + "/courses", course);

const deleteData = (url, course) => {
	return fetch(url, {
		method: "DELETE",
		headers: { "content-type": "Application/Json" },
		body: JSON.stringify(course)
	});
};

const getCourses = () => fetch(PREFIX + "/courses");
const getLessons = id => fetch(PREFIX + `/lessons?courseId=${id}`);

export {
	createCourse,
	deleteCourse,
	getCourses,
	createLesson,
	getLessons,
	saveLesson
};
