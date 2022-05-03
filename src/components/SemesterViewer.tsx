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
    semesterInputID: string;
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
    moveCourseToSemester: (
        course: Course,
        semesterIndex: number,
        courseIndex: number,
        semesterFound: string
    ) => void;
    deleteSemester: (semesterIndex: number) => void;
};

export const SemesterViewer = ({
    semester,
    courses,
    addCourse,
    deleteCourse,
    updateCourse,
    semesterIndex,
    semesterInputID,
    clearSemester,
    moveCourseUp,
    moveCourseDown,
    moveCourseToSemester,
    deleteSemester
}: SemesterViewerProps) => {
    const [visible, setVisible] = useState<boolean>(true);

    {
        /** Gets the total credit hours for this semester, and displays it to the user */
    }
    let creditTotal = 0;
    courses.map((course: Course) => (creditTotal += course.credithours));

    //console.log("courses = ", courses);

    //Component View

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
            data-testID="fullSemester-div"
        >
            {/** Title and Top Level Buttons for Semester component */}
            <Form.Group as={Row} data-testID="semesterTop-Group">
                <Col data-testID="info-col">
                    <h2
                        style={{
                            textAlign: "left",
                            marginLeft: "20px",
                            marginTop: "5px",
                            marginBottom: "0px"
                        }}
                        data-testID="semesterInfo-Header"
                    >
                        {/**
                         * {+semesterIndex +
                            1 +
                            " " +
                            semester.term +
                            "  " +
                            semester.year}
                         * 
                         */}
                        {semester.term + "  " + semester.year}
                    </h2>
                    <p
                        style={{
                            marginTop: "0px",
                            textAlign: "left",
                            marginLeft: "20px"
                        }}
                        data-testID="semesterCredits-para"
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
                    data-testID="Buttons-col"
                >
                    <Button
                        onClick={() =>
                            addCourse(
                                {
                                    name: "Introduction to Planning",
                                    prereqs: [],
                                    credithours: 3,
                                    satisfied_requirements: [],
                                    courseId: "PLAN000",
                                    backup: {
                                        name: "",
                                        prereqs: [],
                                        credithours: 3,
                                        satisfied_requirements: [],
                                        courseId: "PLAN000"
                                    }
                                },
                                semesterIndex
                            )
                        }
                        data-testID="addCourse-button"
                        style={{ marginTop: "5px", marginRight: "5px" }}
                    >
                        Add Blank Course
                    </Button>
                    <Button
                        onClick={() => clearSemester(semesterIndex)}
                        data-testID="clearSemester-button"
                        style={{ marginTop: "5px", marginRight: "5px" }}
                    >
                        Clear Semester
                    </Button>
                    <Button
                        onClick={() => deleteSemester(semesterIndex)}
                        data-testID="deleteSemester-button"
                        style={{ marginTop: "5px", marginRight: "5px" }}
                    >
                        Remove Semester
                    </Button>
                    <Button
                        onClick={() => setVisible(!visible)}
                        data-testID="show/hide-button"
                        style={{ marginTop: "5px", marginRight: "5px" }}
                    >
                        Show/Hide
                    </Button>
                </Col>
            </Form.Group>

            {/** Shows the SemesterView Component when not hidden */}
            {visible && (
                <div data-testID="courseList-div">
                    {courses.map(
                        (course: Course, ind: number): JSX.Element => (
                            <div
                                key={course.courseId}
                                data-testID="courseViewer-div"
                            >
                                <CourseViewer
                                    course={course}
                                    updateCourse={updateCourse}
                                    deleteCourse={deleteCourse}
                                    semesterIndex={semesterIndex}
                                    semesterInputID={semesterInputID}
                                    courseIndex={ind}
                                    moveCourseUp={moveCourseUp}
                                    moveCourseDown={moveCourseDown}
                                    moveCourseToSemester={moveCourseToSemester}
                                ></CourseViewer>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};
