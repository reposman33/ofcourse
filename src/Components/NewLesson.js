import React, { useState } from "react";
import { connect } from "react-redux";
import { addLesson } from "../actions";
import "./NewLesson.scss";

const NewLesson = ({ courseId, loadLesson, addLesson }) => {
	const [editMode, setEditMode] = useState(false);
	const [lessonName, setLessonName] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		addLesson({
			name: lessonName,
			courseId: courseId
		});
		reset();
	};

	const reset = () => {
		setLessonName("");
		setEditMode(false);
	};

	return editMode ? (
		loadLesson ? (
			<div>Loading...</div>
		) : (
			<div className='NewLesson'>
				<form onSubmit={handleSubmit}>
					<label htmlFor='NewLesson'>
						<input
							type='text'
							id='NewLesson'
							value={lessonName}
							onChange={e => setLessonName(e.target.value)}
							placeholder='Title'
						/>
					</label>
					<button type='submit'>OK</button>
				</form>
			</div>
		)
	) : (
		<button onClick={() => setEditMode(true)}>New Lesson</button>
	);
};

const mapStateToProps = state => ({
	loadLesson: state.lessons.loadLesson
});
const mapDispatchToProps = {
	addLesson
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NewLesson);
