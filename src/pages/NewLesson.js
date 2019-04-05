import React from "react";

const NewLesson = () => (
  <div className="header">
    <h1>New Lesson</h1>
    <label htmlFor="courseName">
      Name:
      <input type="text" onChange="handleOnChange" id="courseName" />
    </label>
  </div>
);

export default NewLesson;
