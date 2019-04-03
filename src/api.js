const createCourse = course => postData("/courses", course);

const postData = (url = "", data = {}) => {
  return fetch(url, {
    method: "POST",
    headers: { "content-type": "Application/Json" },
    body: JSON.stringify(data)
  }).then(response => response.json());
};

const deleteCourse = course => deleteData("/courses", course);

const deleteData = (url, course) => {
  return fetch(url, {
    method: "DELETE",
    headers: { "content-type": "Application/Json" },
    body: JSON.stringify(course)
  });
};

const getCourses = () => fetch("/courses");

export { createCourse, deleteCourse, getCourses };
