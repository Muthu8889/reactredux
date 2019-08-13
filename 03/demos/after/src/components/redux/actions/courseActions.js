import * as types from "./actionTypes";
import * as courseApi from "../../../api/courseApi";

export function loadCourseSuccess(courses) {
  return {
    type: types.LOAD_COURSE_SUCCESS,
    courses
  };
}

export function createCourseSuccess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
}

export function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
}
export function loadCourses() {
  return function(dispatch) {
    return courseApi
      .getCourses()
      .then(courses => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState){
    return courseApi
    .saveCourse(course).then(saveCourse =>{
      course.id
      ? dispatch(updateCourseSuccess(course))
      : dispatch(createCourseSuccess(course));
    }).catch(error => {
      throw error;
    });
  }
}
