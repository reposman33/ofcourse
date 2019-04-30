import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadLessons } from "../actions";
import { getCourseById } from "../selectors";
import NotFoundPage from "./NotFoundPage";
import NewLesson from "../Components/NewLesson";
import "./CourseDetailPage.css";

const CourseDetailPage = ({ course, lessons, loading, loadLessons }) => {
  if (!course) {
    return <NotFoundPage />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    loadLessons(course.id);
  }, [course]);

  return (
    <div className="CourseDetail">
      <header>
        <h1>{course.name}</h1>
      </header>
      <div className="content">
        <div className="sidebar">
          {lessons && (
            <ul>
              {lessons.map(lesson => (
                <li key={lesson.id}>{lesson.name}</li>
              ))}
            </ul>
          )}
          <NewLesson courseId={course.id} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
<<<<<<< HEAD
	return {
		course: getCourseById(state, ownProps),
		lessons: state.lessons.lessons,
		loading: state.courses.loading
	};
=======
  const courseId = parseInt(ownProps.courseId, 10);
  return {
    course: state.courses.courses.find(c => c.id === courseId),
    lessons: state.lessons.lessons,
    loading: state.courses.loading
  };
>>>>>>> a8e15798df2076e4c2242f9de2c7f5b0f431fd68
};

export default connect(
  mapStateToProps,
  { loadLessons }
)(CourseDetailPage);
