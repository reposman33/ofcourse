import React from "react";
import { connect } from "react-redux";
import { Link } from "@reach/router";
import Modal from "react-modal";
import NewCourse from "../Components/NewCourse";
import {
	openNewCourseModal,
	closeNewCourseModal,
	loadCourses
} from "../actions";
import "./CourseListPage.scss";

const CourseListPage = ({
	courses,
	adding,
	removing,
	error,
	modalOpen,
	openNewCourseModal,
	closeNewCourseModal
}) => {
	return (
		<div className='courselist'>
			<h1>Mijn boekwinkel</h1>
			{adding ? "Saving new course" : ""}
			{removing ? "Removing new course" : ""}

			<button className='new-course-btn' onClick={openNewCourseModal}>
				Voeg nieuw boek toe
			</button>
			<ul>
				{courses.map(course => (
					<li key={course.id} className='courselist__item'>
						<Link to={`/courses/${course.id}`}>
							<div>{course.name}</div>
							<div>
								&euro; &nbsp;
								{course.price.replace(".", ",")}
							</div>
						</Link>
					</li>
				))}
			</ul>
			{error ? error : ""}
			<Modal isOpen={modalOpen} onRequestClose={closeNewCourseModal}>
				<NewCourse />
			</Modal>
		</div>
	);
};

const CoursePrice = () => {
	return (
		<div className='courselist__item-price'>
			<label>
				<div>Prijs</div>
				<input type='number' step='0.01' min='0' />
			</label>
		</div>
	);
};

const mapStateToProps = state => ({
	courses: state.courses.courses,
	adding: state.adding,
	removing: state.removing,
	error: state.error,
	modalOpen: state.modalOpen
});

const mapDispatchToProps = {
	openNewCourseModal,
	closeNewCourseModal,
	loadCourses
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CourseListPage);
export { CoursePrice };
