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
import { getCourses } from "../selectors";
import styles from "./CourseListPage.module.scss";
// import "./CourseListPage.scss";

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
		<div className={styles.courselist}>
			<h1>Mijn boekwinkel</h1>
			{adding ? "Saving new course" : ""}
			{removing ? "Removing new course" : ""}

			<button
				className={styles["new-course-btn"]}
				onClick={() => openNewCourseModal()}>
				Voeg nieuw boek toe
			</button>
			<ul>
				{courses.map(course => (
					<li key={course.id} className={styles.courselist__item}>
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
			{error ? error.message : ""}
			<Modal isOpen={modalOpen} onRequestClose={closeNewCourseModal}>
				<NewCourse />
			</Modal>
		</div>
	);
};

const CoursePrice = () => {
	return (
		<div className={styles.courselist__itemPrice}>
			<label>
				<div>Prijs</div>
				<input type='number' step='0.01' min='0' />
			</label>
		</div>
	);
};

const mapStateToProps = state => ({
	courses: getCourses(state),
	adding: state.courses.adding,
	removing: state.courses.removing,
	error: state.courses.error,
	modalOpen: state.courses.modalOpen
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
