const createCourse = course => postData(PREFIX + "/courses", course);
const createLesson = lesson => postData(PREFIX + "/lessons", lesson);
const PREFIX = "/api";

const postData = (url = "", data = {}) => {
	return fetch(url, {
		method: "POST",
		headers: { "content-type": "Application/Json" },
		body: JSON.stringify(data)
	}).then(response => response);
};

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

export { createCourse, deleteCourse, getCourses, createLesson, getLessons };
