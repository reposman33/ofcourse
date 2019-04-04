const createCourse = course => postData(PREFIX + "/courses", course);
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

export { createCourse, deleteCourse, getCourses };
