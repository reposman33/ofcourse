const PREFIX = "/api";

const handleError = res => {
	if (!res.ok) {
		// // If server down response body consists of text 'Proxy error: Could not...' , json() gives an error 'Unexpected token P in JSON at position 0'
		return res.text().then(error => {
			// // return status and statusText instead
			const MAX_ERROR_LENGTH = 50;
			const errorStatus = `${res.status} (${res.statusText})`;
			const errorBody =
				error.length > MAX_ERROR_LENGTH
					? error.substr(0, MAX_ERROR_LENGTH) + "..."
					: error;
			const err = { errorBody, errorStatus };
			throw err;
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
	// postData(PREFIX + `/login`, { username, password });
	fetch(PREFIX + `/users?username=${username}&password=${password}`).then(
		res => handleError(res)
	);

const createUser = (username, password) =>
	postData(PREFIX + `/users`, { username, password });

const registerLogin = user =>
	postData(PREFIX + `/login`, user).then(res => res);

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
	createUser,
	registerLogin
};
