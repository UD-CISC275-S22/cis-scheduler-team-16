import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Semester } from "../templates/semester";
import { CourseViewer } from "../components/CourseViewer";
import { Course } from "../templates/course";

type SemesterViewerProps = {
    semester: Semester;
    courses: Course[];
    addCourse: (course: Course, semesterIndex: number) => void;
    deleteCourse: (semesterIndex: number, courseIndex: number) => void;
    updateCourse: (
        course: Course,
        semesterIndex: number,
        courseIndex: number
    ) => void;
    semesterIndex: number;
    clearSemester: (semesterIndex: number) => void;
    moveCourseUp: (
        course: Course,
        semesterIndex: number,
        courseIndex: number
    ) => void;
    moveCourseDown: (
        course: Course,
        semesterIndex: number,
        courseIndex: number
    ) => void;
};

export const SemesterViewer = ({
    semester,
    courses,
    addCourse,
    deleteCourse,
    updateCourse,
    semesterIndex,
    clearSemester,
    moveCourseUp,
    moveCourseDown
}: SemesterViewerProps) => {
    const [visible, setVisible] = useState<boolean>(true);

    {
        /** Gets the total credit hours for this semester, and displays it to the user */
    }
    let creditTotal = 0;
    courses.map((course: Course) => (creditTotal += course.credithours));

    console.log("courses = ", courses);

    //Component View, lizard bad

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
                            marginTop: "5px",
                            marginBottom: "0px"
                        }}
                    >
                        {semester.term + "  " + semester.year}
                    </h2>
                    <p
                        style={{
                            marginTop: "0px",
                            textAlign: "left",
                            marginLeft: "20px"
                        }}
                    >
                        Total Credits: {creditTotal}
                    </p>
                </Col>
                <Col
                    style={{
                        textAlign: "right",
                        marginTop: "10px",
                        marginRight: "20px"
                    }}
                >
                    <Button
                        onClick={() =>
                            addCourse(
                                {
                                    name: "Blank Name",
                                    prereqs: [],
                                    credithours: 3,
                                    satisfied_requirements: [],
                                    courseId: "Blank-Id"
                                },
                                semesterIndex
                            )
                        }
                    >
                        {" "}
                        Insert Course{" "}
                    </Button>{" "}
                    <Button onClick={() => clearSemester(semesterIndex)}>
                        {" "}
                        Clear Semester
                    </Button>{" "}
                    <Button onClick={() => setVisible(!visible)}>
                        Show/Hide
                    </Button>
                </Col>
            </Form.Group>

            {/** Shows the SemesterView Component when not hidden */}
            {visible && (
                <div>
                    {courses.map(
                        (course: Course, ind: number): JSX.Element => (
                            <div key={course.courseId}>
                                <CourseViewer
                                    course={course}
                                    updateCourse={updateCourse}
                                    deleteCourse={deleteCourse}
                                    semesterIndex={semesterIndex}
                                    courseIndex={ind}
                                    moveCourseUp={moveCourseUp}
                                    moveCourseDown={moveCourseDown}
                                ></CourseViewer>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};
