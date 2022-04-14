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
};

export const SemesterViewer = ({
    semester,
    courses,
    addCourse,
    deleteCourse,
    updateCourse,
    semesterIndex
}: SemesterViewerProps) => {
    // export function SemesterViewer({
    //     semester
    // }: {
    //     semester: Semester;
    // }): JSX.Element {
    //State View
    // const [courses, setCourses] = useState<Course[]>(courses);
    const [visible, setVisible] = useState<boolean>(true);

    console.log("courses = ", courses);

    //Component View
    function addCoursev2(): void {
        //adds a blank course to the semesters course list
        const newCourse: Course = {
            courseId: "Blank ID",
            name: "Blank Name",
            prereqs: [],
            credithours: 3,
            satisfied_requirements: []
        };
        const newCourses = [...courses, newCourse];
        // setCourses(newCourses);
    }

    function changeCourses(newCourses: Course[]): void {
        //setCourses(newCourses);
    }

    function clearSem(): void {
        const clearCourses: Course[] = [];
        // setCourses(clearCourses);
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
                    <Button
                        onClick={() =>
                            addCourse(
                                {
                                    name: "Blank Name",
                                    prereqs: [],
                                    credithours: 3,
                                    satisfied_requirements: [],
                                    courseId: "Blank Id"
                                },
                                semesterIndex
                            )
                        }
                    >
                        {" "}
                        Insert Course{" "}
                    </Button>{" "}
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
                        (course: Course, ind: number): JSX.Element => (
                            <div key={course.courseId}>
                                <CourseViewer
                                    course={course}
                                    updateCourse={updateCourse}
                                    deleteCourse={deleteCourse}
                                    semesterIndex={semesterIndex}
                                    courseIndex={ind}
                                ></CourseViewer>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};
