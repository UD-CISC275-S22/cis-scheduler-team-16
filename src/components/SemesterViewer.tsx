import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Semester } from "../templates/semester";
import { CourseViewer } from "../components/CourseViewer";
import { Course } from "../templates/course";

export const SemesterViewer = ({ semester }: { semester: Semester }) => {
    // export function SemesterViewer({
    //     semester
    // }: {
    //     semester: Semester;
    // }): JSX.Element {
    //State View
    const [courses, setCourses] = useState<Course[]>(semester.courses);
    const [visible, setVisible] = useState<boolean>(true);

    //Component View
    function addCourse(): void {
        //adds a blank course to the semesters course list
        const newCourse: Course = {
            courseId: "Blank ID",
            name: "Blank Name",
            prereqs: [],
            credithours: 3,
            satisfied_requirements: []
        };
        const newCourses = [...courses, newCourse];
        setCourses(newCourses);
    }
    function clearSem(): void {
        const clearCourses: Course[] = [];
        setCourses(clearCourses);
    }
    //Return View
    return (
        <div
            style={{
                marginLeft: "20px",
                marginRight: "20px",
                marginBottom: "10px",
                borderColor: "darkslategray",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "5px"
            }}
        >
            {/** Title and Top Level Buttons for Semester component */}
            <Form.Group as={Row}>
                <Col>
                    <h2
                        style={{
                            textAlign: "left",
                            marginLeft: "20px",
                            marginTop: "5px"
                        }}
                    >
                        {semester.term + "  " + semester.year}
                    </h2>
                </Col>
                <Col
                    style={{
                        textAlign: "right",
                        marginTop: "10px",
                        marginRight: "20px"
                    }}
                >
                    <Button onClick={addCourse}> Insert Course </Button>{" "}
                    <Button onClick={clearSem}> Clear Semester </Button>{" "}
                    <Button onClick={() => setVisible(!visible)}>
                        Show/Hide
                    </Button>
                </Col>
            </Form.Group>

            {/** Shows the SemesterView Component when not hidden */}
            {visible && (
                <div>
                    {courses.map(
                        (course: Course): JSX.Element => (
                            <div key={course.courseId}>
                                <CourseViewer course={course}></CourseViewer>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};
