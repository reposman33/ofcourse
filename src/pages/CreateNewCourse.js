import React, { useState } from "react";
import { connect } from "react-redux";
import { addCourse } from "../actions";

const CreateNewCourse = ({ dispatch }) => {
  const [courseName, setCourseName] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addCourse(courseName));
    setCourseName("");
  };
  return (
    <div className="CreateCourse">
      <h3>Create a new course</h3>
      <form className="createCourse-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
          />
        </label>
        <button type="submit">OK</button>
      </form>
    </div>
  );
};

export default connect()(CreateNewCourse);
