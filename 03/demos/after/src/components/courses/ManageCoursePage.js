import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../redux/actions/courseActions";
import * as auhtorActions from "../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class ManageCoursePage extends React.Component {

  componentDidMount() {
    const { actions, authors, courses } = this.props;

    if (courses.length === 0) {
      actions.loadCourses().catch(error => {
        alert("loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      actions.loadAuthors().catch(error => {
        alert("Loading auhtors failed" + error);
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Managing Course</h2>
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(auhtorActions.loadCourses, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
