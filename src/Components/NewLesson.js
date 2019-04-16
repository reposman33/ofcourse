import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { addLesson, loadLessons } from "../actions";
import "./NewLesson.scss";

const NewLesson = ({
  courseId,
  addLesson,
  getLessons,
  lessons,
  error,
  loadLessons
}) => {
  const [editMode, setEditMode] = useState(false);
  const [lessonName, setLessonName] = useState("");
  const inputRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    addLesson({
      name: lessonName,
      courseId: courseId
    });
    reset();
    loadLessons(courseId);
  };

  const reset = () => {
    setLessonName("");
    setEditMode(false);
  };

  return editMode ? (
    <div>
      <form className="add-lesson-button editing">
        <input
          ref={inputRef}
          type="text"
          id="NewLesson"
          value={lessonName}
          onChange={e => setLessonName(e.target.value)}
          placeholder="Title"
        />
      </form>
      {error && `${error.message} (${error.detail})`}
      <button onClick={handleSubmit}>OK</button>
    </div>
  ) : (
    <div>
      <button onClick={() => setEditMode(true)} className="add-lesson-button">
        New Lesson
      </button>
      {error && `${error.message} (${error.detail})`}
    </div>
  );
};

const mapStateToProps = state => ({
  addLesson: state.addLesson,
  getLessons: state.getLEssons,
  lessons: state.lessons,
  error: state.error
});
const mapDispatchToProps = {
  addLesson,
  loadLessons
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewLesson);
