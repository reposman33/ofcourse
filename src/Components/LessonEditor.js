import React from "react";
import { connect } from "react-redux";
import { setLessonMarkdown } from "../actions";

const LessonEditor = ({ lesson, setLessonMarkdown }) => {
	return (
		<div>
			<div className='lesson-editor-help'>
				<p>
					You are editing this lesson. Changes are saved
					automatically.
				</p>
			</div>
			<div>les: '{lesson.id}'</div>
			<textarea
				className='lesson-editor'
				value={lesson.name || ""}
				onChange={e => setLessonMarkdown(lesson, e.target.value)}
			/>
		</div>
	);
};

const mapDispatch = dispatch => ({
	setLessonMarkdown: () => dispatch(setLessonMarkdown)
});

export default connect(
	null,
	{ setLessonMarkdown }
)(LessonEditor);
// export default LessonEditor;
