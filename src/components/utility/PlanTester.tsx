import React from "react";
import { Course } from "../../templates/course";
import { Semester } from "../../templates/semester";
import { Plan } from "../../templates/plan";

export function checkPlan(plan: Plan): JSX.Element {
    const planCourses: string[] = [];
    let creditCount = 0;
    plan.semesters.map((semester: Semester) => {
        semester.courses.map((course: Course) => {
            planCourses.push(course.courseId);
            creditCount = creditCount + course.credithours;
        });
    });

    return (
        <div>
            {planCourses.map((course: string) => course)}
            <p>{creditCount}</p>
        </div>
    );
}
