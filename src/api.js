const PREFIX = "/api";

const handleError = res => {
	if (!res.ok) {
		return res.json().then(body => {
			throw new Error(body.message);
		});
	} else {
		return res.json();
	}
};

const fetchWithData = (url, data = {}, method = "POST") => {
	return fetch(url, {
		method: method,
		headers: { "content-type": "Application/Json" },
		body: JSON.stringify(data)
	}).then(res => handleError(res));
};

const postData = (url, data = {}) => fetchWithData(url, data, "POST");

const putData = (url, data = {}) => fetchWithData(url, data, "PUT");

const deleteData = (url, data = {}) => fetchWithData(url, data, "DELETE");

const getCourses = () =>
	fetch(PREFIX + "/courses").then(res => handleError(res));

const createCourse = course => postData(PREFIX + "/courses", course);

const deleteCourse = course => deleteData(PREFIX + "/courses", course);

const getLessons = id =>
	fetch(PREFIX + `/lessons?courseId=${id}`).then(res => handleError(res));

const createLesson = lesson => postData(PREFIX + "/lessons", lesson);

const saveLesson = lesson => putData(PREFIX + `/lessons/${lesson.id}`, lesson);

const deleteLesson = lessonId => deleteData(PREFIX + `/lessons/${lessonId}`);

const saveLessonMarkdown = (lesson, markdown) =>
	putData(PREFIX + `/lessons/${lesson.id}`, { ...lesson, markdown });

const loginUser = (username, password) =>
	postData(PREFIX + `/login`, { username, password });

const createUser = (username, password) =>
	putData(PREFIX + `/users`, { username, password });

export {
	createCourse,
	deleteCourse,
	getCourses,
	createLesson,
	getLessons,
	saveLesson,
	deleteLesson,
	saveLessonMarkdown,
	loginUser,
	createUser
};
