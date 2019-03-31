import React from "react";
import { connect } from "react-redux";
import { removeCourse } from "../actions";
import CreateNewCourse from "./CreateNewCourse";
import "./CourseListPage.css";

const CourseListPage = ({ courses, dispatch, adding, removing }) => {
  const onHandleRemove = course => {
    dispatch(removeCourse(course));
  };

  return (
    <div>
      <h1> Courses this semester</h1>
      {adding ? "Saving new course" : ""}
      {removing ? "Removing new course" : ""}
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.name}
            <button
              type="button"
              data-id={course.id}
              onClick={function() {
                onHandleRemove(course);
              }}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
      <CreateNewCourse />
    </div>
  );
};

const mapStateToProps = state => ({
  courses: state.courses,
  adding: state.adding,
  removing: state.removing
});

export default connect(mapStateToProps)(CourseListPage);
