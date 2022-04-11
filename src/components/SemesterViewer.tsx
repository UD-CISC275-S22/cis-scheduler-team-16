import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Semester } from "../templates/semester";
import { CourseViewer } from "../components/CourseViewer";
import { Course } from "../templates/course";

export function SemesterViewer({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    //State View

    //Component View

    //Return View
    return (
        <div>
            {" "}
            <div>{semester.term}</div>
            <div>{semester.year}</div>
            <div>
                {semester.courses.map(
                    (course: Course): JSX.Element => (
                        <div key={course.courseId}>
                            <CourseViewer course={course}></CourseViewer>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
