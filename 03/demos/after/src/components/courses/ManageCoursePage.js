import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../redux/actions/courseActions";
import * as auhtorActions from "../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import newCourse from "../../../tools/mockData";

function ManageCoursePage({
  authors,
  courses,
  loadAuthors,
  loadCourses,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setError] = useState({});
  useEffect(() => {
    if (courses.length === 0) {  
      loadCourses().catch(error => {
        alert("loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("Loading auhtors failed" + error);
      });
    }
  }, []);

  return (
    <div>
      <CourseForm course={course} errors={errors} authors={authors} />
    </div>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    course: newCourse,
    courses: state.courses,
    authors: state.authors
  };
}

const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: auhtorActions.loadCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
