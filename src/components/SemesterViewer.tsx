import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Semester } from "../templates/semester";
import { CourseViewer } from "../components/CourseViewer";
import { Course } from "../templates/course";

export function SemesterViewer({
    semester
}: {
    semester: Semester;
}): JSX.Element {
    //State View
    const [courses, setCourses] = useState<Course[]>(semester.courses);
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
        <div>
            {" "}
            <div>{semester.term}</div>
            <div>{semester.year}</div>
            <div>
                {courses.map(
                    (course: Course): JSX.Element => (
                        <div key={course.courseId}>
                            <CourseViewer course={course}></CourseViewer>
                        </div>
                    )
                )}
                <Button onClick={addCourse}> Insert Course </Button>{" "}
                <Button onClick={clearSem}> Clear Semester </Button>
            </div>
        </div>
    );
}
