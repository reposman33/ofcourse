import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { addCourse } from "../actions";
import "./NewCourse.css";

const NewCourse = ({ saveError, addCourse }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    addCourse({ name, price });
    setName("");
    setPrice("");
  };
  return (
    <div className="CreateNewCourse">
      <h1>Nieuw boek</h1>
      <form className="CreateNewCourse-form" onSubmit={handleSubmit}>
        <label>
          <div>Titel:</div>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <div className="courselist__item-price">
          <label>
            <div>Prijs (&euro;)</div>
            <input
              type="number"
              value={price}
              step="0.01"
              min="0"
              onChange={e => setPrice(e.target.value)}
            />{" "}
          </label>
        </div>
        {saveError && <div>ERROR: {saveError.message}</div>}
        <button type="submit">OK</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({ saveError: state.saveError });
const mapDispatchToProps = { addCourse };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCourse);
