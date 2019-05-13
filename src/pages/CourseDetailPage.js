import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addLesson, loadLessons, updateLesson } from "../actions";
import { getCourseById, getLessonsByCourseId } from "../selectors";
import { Link, Match } from "@reach/router";
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
	saving,
	deleting,
	loadLessons,
	addLesson,
	updateLesson,
	children
}) => {
	if (!course) {
		return <NotFoundPage />;
	}

	if (loading || saving || deleting) {
		return (
			<div>
				{(loading && "Loading...") ||
					(saving && "Saving...") ||
					(deleting && "Deleting...")}
			</div>
		);
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
								<Match
									key={lesson.id}
									path={`lessons/${lesson.id}`}>
									{({ match }) => {
										const className = `lesson-item ${
											match ? "selected" : ""
										}`;
										return (
											<li>
												<Lesson
													className={className}
													lesson={lesson}
													onSubmit={name =>
														updateLesson({
															...lesson,
															name
														})
													}>
													{(edit, removeLesson) => (
														<div
															className={
																className
															}>
															<Link
																className='lessonName-link'
																to={`lessons/${
																	lesson.id
																}`}>
																<span>
																	{
																		lesson.name
																	}
																</span>
															</Link>
															<div>
																<button
																	className='edit-lesson-btn'
																	onClick={() =>
																		edit(
																			lesson.name
																		)
																	}>
																	Edit
																</button>
																<button
																	className='delete-lesson-btn'
																	onClick={() =>
																		removeLesson(
																			lesson.id
																		)
																	}>
																	Delete
																</button>
															</div>
														</div>
													)}
												</Lesson>
											</li>
										);
									}}
								</Match>
							))}
						</ul>
					)}
					<Lesson
						className='add-lesson-btn'
						onSubmit={name =>
							addLesson({ name, courseId: course.id })
						}>
						{edit => (
							<button className='edit-lessons-btn' onClick={edit}>
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
				<div className='lesson'>{children}</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		course: getCourseById(state, ownProps),
		lessons: getLessonsByCourseId(state, ownProps),
		loading: state.loading,
		saving: state.saving,
		deleting: state.deleting
	};
};

export default connect(
	mapStateToProps,
	{ loadLessons, addLesson, updateLesson }
)(CourseDetailPage);
