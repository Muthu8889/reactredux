import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../redux/actions/courseActions";
import * as auhtorActions from "../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursesPage extends React.Component {

  handleChange = event => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.actions.createCourse(this.state.course);
  };

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
        {/* <form onSubmit={this.handleSubmit}> */}
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
        {/* <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
        />

        <input type="submit" value="Save" /> */}
        {/* {this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))} */}
        {/* </form> */}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
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
)(CoursesPage);
