import React, { useEffect } from "react";
import { connect } from "react-redux";
import { loadLessons } from "../actions";

import NotFoundPage from "./NotFoundPage";
import NewLesson from "../Components/NewLesson";
import "./CourseDetailPage.css";

const CourseDetailPage = ({ course, lessons, loading, loadLessons }) => {
	if (!course) {
		return <NotFoundPage />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	useEffect(() => {
		loadLessons(course.id);
	}, [course]);

	return (
		<div className='CourseDetail'>
			<header>
				<h1>{course.name}</h1>
			</header>
			<div className='content'>
				<div className='sidebar'>
					{lessons ? (
						<ul>
							{lessons.map(lesson => (
								<li key={lesson.id}>{lesson.name}</li>
							))}
						</ul>
					) : (
						""
					)}
					<NewLesson courseId={course.id} />
				</div>
				<div className='lesson' />
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	const courseId = parseInt(ownProps.courseId, 10);
	return {
		course: state.courses.courses.find(c => c.id === courseId),
		lessons: state.lessons.lessons,
		loading: state.courses.loading
	};
};

export default connect(
	mapStateToProps,
	{ loadLessons }
)(CourseDetailPage);
