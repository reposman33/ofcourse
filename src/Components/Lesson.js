import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { loadLessons } from "../actions";
import "./Lesson.scss";

const Lesson = ({ error, onSubmit, className, lesson, children }) => {
	const initialTitle = lesson ? lesson.name : "";
	const [editMode, setEditMode] = useState(false);
	const [lessonName, setLessonName] = useState(initialTitle);
	const inputRef = useRef();

	const beginEditing = () => setEditMode(true);

	const handleBlur = () => setEditMode(false);

	const handleSubmit = e => {
		e.preventDefault();
		onSubmit(lessonName);
		reset();
	};
	const reset = () => {
		setEditMode(false);
		setLessonName("");
	};

	return editMode ? (
		<div>
			<form
				className={`${className || ""} editing`}
				onSubmit={handleSubmit}>
				<input
					ref={inputRef}
					type='text'
					id='NewLesson'
					onChange={e => setLessonName(e.target.value)}
					placeholder='Title'
					onBlur={handleBlur}
				/>
			</form>
			{error && `Error! ${error.message} (${error.detail})`}
		</div>
	) : (
		<div>
			{children(beginEditing)}
			{error && `Error! ${error.message} (${error.detail})`}
		</div>
	);
};

const mapStateToProps = state => ({
	error: state.error
});
const mapDispatchToProps = {
	loadLessons
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Lesson);
