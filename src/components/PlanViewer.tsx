import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { Course } from "../templates/course";
import { Semester } from "../templates/semester";
import { CourseViewer } from "./CourseViewer";
import { SemesterViewer } from "./SemesterViewer";
import { Plan } from "../templates/plan";
import planList from "../templates/PlansList.json";

type COURSE_OPERATIONS = "add" | "update" | "delete";

export function PlanViewer(): JSX.Element {
    const INITIAL_PLANS: Plan[] = planList.map(
        (plan): Plan => ({
            ...plan,
            semesters: plan.semesters.map(
                (semester): Semester => ({
                    ...semester,
                    courses: semester.courses.map(
                        (course): Course => ({
                            ...course
                        })
                    )
                })
            )
        })
    );

    // This is the State
    const [allPlans, setAllPlans] = useState<Plan[]>(INITIAL_PLANS);
    const [curPlan, setCurPlan] = useState<Plan>(allPlans[0]);

    //This is the Control

    function updatePlan(event: React.ChangeEvent<HTMLSelectElement>) {
        //console.log("setting plan to : ", allPlans[+event.target.value]);
        setCurPlan(allPlans[+event.target.value]); //CONVERT STRING TO NUMBER (INDEX)
    }

    /**
     * This function takes a index, and a semester which we use to update the plan's semester at that index
     * @param index The index of the semester in curPlan we are updating
     * @param semester The updated semester
     */
    const planSetter = (index: number, semester: Semester): void => {
        const planSemesters = [...curPlan.semesters].map((e) => {
            return { ...e, courses: [...e.courses] };
        });
        const planSemester = planSemesters.splice(index, 1)[0];
        planSemesters.splice(index, 0, semester);
        setCurPlan({ ...curPlan, semesters: planSemesters });
    };

    /**
     * This is a function to update the course in the semester, called in SemesterViewer
     * @param course The course to update in the semester
     * @param semseterIndex Which semester to update
     * @param courseIndex Which course to delete/update
     * @param type What operation we're doing
     */
    const updateSemesterCourse = ({
        course,
        semesterIndex,
        courseIndex,
        opType
    }: {
        course?: Course;
        semesterIndex: number;
        courseIndex?: number;
        opType: COURSE_OPERATIONS;
    }) => {
        const semester = curPlan.semesters[semesterIndex];
        switch (opType) {
            case "add": {
                // add course
                if (course) {
                    semester.courses = [...semester.courses, course];
                }
                break;
            }
            case "delete": {
                // delete course
                if (courseIndex) {
                    semester.courses.splice(courseIndex, 1);
                }
                break;
            }
            case "update": {
                // update course
                semester.courses = [...semester.courses].map(
                    (e: Course, ind: number) => {
                        if (ind === courseIndex) {
                            return course ?? e;
                        } else {
                            return e;
                        }
                    }
                );
                break;
            }
            default: {
                break;
            }
        }
        planSetter(semesterIndex, semester);
    };

    // This is the View
    return (
        <div>
            <Form.Group controlId="userPlan">
                <Form.Label>Choose your current plan</Form.Label>
                <Form.Select value={curPlan.id} onChange={updatePlan}>
                    <option value="0">Plan 1</option>
                    <option value="1">Plan 2</option>
                </Form.Select>
            </Form.Group>
            {/* The user is at <>/*{curPlan.name}</></>. */}
            {curPlan.semesters.map((eachSemester: Semester, ind: number) => {
                return (
                    <SemesterViewer
                        semesterIndex={ind}
                        semester={eachSemester}
                        courses={eachSemester.courses}
                        key={ind}
                        addCourse={(course: Course, semesterIndex: number) =>
                            updateSemesterCourse({
                                course,
                                semesterIndex,
                                opType: "add"
                            })
                        }
                        deleteCourse={(
                            semesterIndex: number,
                            courseIndex: number
                        ) => {
                            updateSemesterCourse({
                                semesterIndex: semesterIndex,
                                courseIndex: courseIndex,
                                opType: "delete"
                            });
                        }}
                        updateCourse={(
                            course: Course,
                            semesterIndex: number,
                            courseIndex: number
                        ) => {
                            updateSemesterCourse({
                                course,
                                semesterIndex,
                                courseIndex,
                                opType: "update"
                            });
                        }}
                    />
                );
            })}
        </div>
    );
}
