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
			<div>les: '{lesson.name}'</div>
			<textarea
				className='lesson-editor'
				value={lesson.markdown || ""}
				onChange={e => setLessonMarkdown(lesson, e.target.value)}
			/>
		</div>
	);
};

const mapDispatch = { setLessonMarkdown };

export default connect(
	null,
	mapDispatch
)(LessonEditor);
