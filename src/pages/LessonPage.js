import React from "react";
import { connect } from "react-redux";
import LessonEditor from "../Components/LessonEditor";
import NotFoundPage from "./NotFoundPage";
import ReactMarkdown from "react-markdown";
import { togglepreviewMode } from "../actions";

const LessonPage = ({ lesson, loading, previewMode, togglepreviewMode }) => {
	if (loading) return "Loading...";
	if (!lesson) {
		return <NotFoundPage />;
	}

	return (
		<div>
			<button onClick={() => togglepreviewMode()}>
				{previewMode ? "Editmode" : "Preview"}
			</button>
			{previewMode ? (
				<ReactMarkdown source={lesson.markdown} />
			) : (
				<LessonEditor lesson={lesson} />
			)}
		</div>
	);
};
const mapState = (state, props) => {
	const lessonId = parseInt(props.lessonId, 10);
	return {
		lesson: state.lessons.lessons[lessonId],
		loading: state.lessons.loading,
		previewMode: state.app.previewMode
	};
};

const mapDispatch = { togglepreviewMode };

export default connect(
	mapState,
	mapDispatch
)(LessonPage);
