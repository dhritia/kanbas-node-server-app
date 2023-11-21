import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;
const COURSES_URL = `${API_BASE}/courses`;
const ASSIGNMENT_URL = `${API_BASE}/assignments`;
export const updateAssignment = async (assignment) => {
  const response = await axios.
    put(`${ASSIGNMENT_URL}/${assignment._id}`, assignment);
  console.log(assignment._id);
  return response.data;
};
export const deleteAssignment = async (assignmentId) => {
  const response = await axios
    .delete(`${ASSIGNMENT_URL}/${assignmentId}`);
  return response.data;
};
export const createAssignment = async (courseId, assignment) => {
    const response = await axios.post(
      `${COURSES_URL}/${courseId}/assignments/AssignmentEditor`,
      assignment
    );
    return response.data;
};
export const findAssignmentsForCourse = async (courseId) => {
    const response = await axios
      .get(`${COURSES_URL}/${courseId}/assignments`);
      return response.data;
};