import React from "react";
import { connect } from "react-redux";
import NotFoundPage from "./NotFoundPage";
import "./CourseDetailPage.css";

const CourseDetailPage = ({ course, loading }) => {
  if (!course) {
    return <NotFoundPage />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CourseDetail">
      <header>
        <h1>{course.name}</h1>
      </header>
      <div className="content">
        <div className="sidebar" />
        <div className="lesson" />
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  course: state.courses.find(
    course => course.id === parseFloat(ownProps.courseId)
  ),
  loading: state.loading
});

export default connect(mapStateToProps)(CourseDetailPage);
