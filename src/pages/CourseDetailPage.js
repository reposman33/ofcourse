import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addLesson, updateLesson, loadLessons } from "../actions";
import { getCourseById, getLessonsByCourseId } from "../selectors";
import NotFoundPage from "./NotFoundPage";
import Lesson from "../Components/Lesson";
import "./CourseDetailPage.css";
import { navigate } from "@reach/router";

const navigateToOverview = () => {
	navigate("/");
};

const CourseDetailPage = ({
	course,
	lessons,
	loading,
	loadLessons,
	addLesson,
	updateLesson
}) => {
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
					{lessons && (
						<ul className='lessons'>
							{lessons.map(lesson => (
								<li key={lesson.id}>
									<Lesson
										className='lesson-item'
										lesson={lesson}
										onSubmit={name =>
											updateLesson({
												...lesson,
												name
											})
										}>
										{edit => (
											<div className='lesson-item'>
												{lesson.name}
												<button
													className='edit-lesson-btn'
													onClick={() =>
														edit(lesson.name)
													}>
													Edit
												</button>
											</div>
										)}
									</Lesson>
								</li>
							))}
						</ul>
					)}
					<Lesson
						className='add-lesson-btn'
						onSubmit={lesson => addLesson(lesson, course.id)}>
						{edit => (
							<button className='add-lesson-btn' onClick={edit}>
								Add
							</button>
						)}
					</Lesson>

					<button
						className='list-lessons-button'
						onClick={navigateToOverview}>
						Overzicht
					</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		course: getCourseById(state, ownProps),
		lessons: getLessonsByCourseId(state, ownProps),
		loading: state.courses.loading
	};
};

export default connect(
	mapStateToProps,
	{ loadLessons, addLesson, updateLesson }
)(CourseDetailPage);
