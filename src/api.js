const createCourse = name =>
  postData("http://localhost:8080/courses", { name });

const postData = (url = "", data = {}) => {
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "Application/Json" },
    body: JSON.stringify(data)
  }).then(response => response.json());
};

const deleteCourse = course =>
  deleteData("http://localhost:8080/courses", course);

const deleteData = (url, course) => {
  return fetch(url, {
    method: "DELETE",
    headers: { "content-type": "Application/Json" },
    body: JSON.stringify(course)
  });
};

const getCourses = () => fetch("http://localhost:8080/courses");

export { createCourse, deleteCourse, getCourses };
