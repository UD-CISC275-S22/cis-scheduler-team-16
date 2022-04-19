import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { Course } from "../templates/course";
import { Semester } from "../templates/semester";
//import { CourseViewer } from "./CourseViewer";
import { SemesterViewer } from "./SemesterViewer";
import { Plan } from "../templates/plan";
import planList from "../templates/PlansList.json";
import { checkPlan } from "./utility/PlanTester";

type COURSE_OPERATIONS =
    | "add"
    | "update"
    | "delete"
    | "clear"
    | "moveup"
    | "movedown"
    | "moveCourseToSemester"
    | "addSemester"
    | "deleteSemester"
    | "addPlan"
    | "deletePlan";

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
    const [currentConcentration, setCurrentConcentration] = useState<string>(
        "Traditional Computer Science (BS)"
    );

    // Get the total number of credit hours for this Plan
    let totalCredits = 0;
    curPlan.semesters.map((semester: Semester) =>
        semester.courses.map(
            (course: Course) => (totalCredits += course.credithours)
        )
    );

    //This is the Control

    function updatePlan(event: React.ChangeEvent<HTMLSelectElement>) {
        //console.log("setting plan to : ", allPlans[+event.target.value]);
        console.log(allPlans);
        console.log(curPlan.semesters);
        const clonedAllPlans = [...allPlans].map((eachPlan: Plan) => {
            if (eachPlan.id === curPlan.id) {
                return {
                    ...curPlan,
                    semesters: [...curPlan.semesters].map(
                        (eachSemester: Semester) => {
                            return {
                                ...eachSemester,
                                courses: [...eachSemester.courses]
                            };
                        }
                    )
                };
            }
            return { ...eachPlan };
        });
        setAllPlans(clonedAllPlans);
        setCurPlan(clonedAllPlans[+event.target.value]); //CONVERT STRING TO NUMBER (INDEX)
    }

    function updateCurrentConcentration(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        setCurrentConcentration(event.target.value);
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
        planSemesters.splice(index, 1)[0];
        planSemesters.splice(index, 0, semester);
        setCurPlan({ ...curPlan, semesters: planSemesters });
    };

    const semesterAdder = (semester: Semester): void => {
        const planSemesters = [...curPlan.semesters].map((e) => {
            return { ...e, courses: [...e.courses] };
        });
        planSemesters.splice(planSemesters.length, 0, semester);
        setCurPlan({ ...curPlan, semesters: planSemesters });
    };

    const planAdder = (newPlan: Plan): void => {
        const newPlans = [...allPlans];
        newPlans.splice(allPlans.length, 0, newPlan);
        setAllPlans(newPlans);
        console.log("Add Plan: ", newPlans);
        console.log("Add Plan: ", allPlans);
    };

    const semesterDeleter = (index: number): void => {
        if (curPlan.semesters.length > 0) {
            curPlan.semesters.splice(index, 1);
            const planSemesters = [...curPlan.semesters].map(
                (e, ind: number) => {
                    return { ...e, semesterId: ind, courses: [...e.courses] };
                }
            );
            planSemesters.splice(planSemesters.length, 1);
            setCurPlan({
                ...curPlan,
                semesters: planSemesters
            });
        }
    };

    const planDeleter = (): void => {
        if (allPlans.length > 0) {
            const newPlans = [...allPlans];
            newPlans.splice(parseInt(curPlan.id), 1);
            setCurPlan(newPlans[0]);
            setAllPlans(newPlans);
        }
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
        semesterInputID,
        courseIndex,
        opType
    }: {
        course?: Course;
        semesterIndex: number;
        semesterInputID?: number;
        courseIndex?: number;
        opType: COURSE_OPERATIONS;
    }) => {
        const semester = curPlan.semesters[semesterIndex];
        const clonedPlan = { ...curPlan };
        switch (opType) {
            case "add": {
                // add course
                if (course) {
                    semester.courses = [
                        ...semester.courses,
                        { ...course, courseId: `${semester.courses.length}` }
                    ];
                }
                planSetter(semesterIndex, semester);
                break;
            }
            case "delete": {
                // delete course
                if (courseIndex !== undefined) {
                    semester.courses.splice(courseIndex, 1);
                }
                planSetter(semesterIndex, semester);
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
                planSetter(semesterIndex, semester);
                break;
            }
            case "clear": {
                semester.courses = [];
                planSetter(semesterIndex, semester);
                break;
            }
            case "moveup": {
                if (courseIndex != undefined && courseIndex > 0) {
                    const tmpCourse = semester.courses[courseIndex];
                    semester.courses[courseIndex] =
                        semester.courses[courseIndex - 1];
                    semester.courses[courseIndex - 1] = tmpCourse;
                }
                planSetter(semesterIndex, semester);
                break;
            }
            case "movedown": {
                if (
                    courseIndex != undefined &&
                    courseIndex < semester.courses.length - 1
                ) {
                    const tmpCourse = semester.courses[courseIndex];
                    semester.courses[courseIndex] =
                        semester.courses[courseIndex + 1];
                    semester.courses[courseIndex + 1] = tmpCourse;
                }
                planSetter(semesterIndex, semester);
                break;
            }
            case "moveCourseToSemester": {
                if (
                    courseIndex !== undefined &&
                    semesterInputID !== undefined &&
                    course &&
                    semesterInputID >= 0 &&
                    semesterInputID < curPlan.semesters.length
                ) {
                    //console.log("semesterInput: ", semesterInputID);
                    const moveCourse = semester.courses.splice(courseIndex, 1);
                    /*
                    if (semesterIndex === semesterInputID) {
                        semester.courses = [...semester.courses, moveCourse[0]];
                    }
                    */
                    curPlan.semesters.map((s: Semester, ind: number) => {
                        if (ind === semesterInputID) {
                            s.courses = [...s.courses, moveCourse[0]];
                        }
                    });
                }
                planSetter(semesterIndex, semester);
                break;
            }
            case "addSemester": {
                // add course
                //console.log("Assembly Guy");
                const newSemester = {
                    term: "Blank Semester",
                    courses: [],
                    year: 3,
                    id: `${clonedPlan.semesters.length}`
                };
                //console.log("newSem length: ", newSemesters.length);
                semesterAdder(newSemester);
                break;
            }
            case "deleteSemester": {
                // delete course
                if (semesterIndex !== undefined) {
                    console.log("semesterIndex: ", semesterIndex);
                    semesterDeleter(semesterIndex);
                }
                break;
            }
            default: {
                break;
            }
            case "addPlan": {
                // add course
                const newPlan = {
                    name: "New Plan " + `${allPlans.length + 1}`,
                    semesters: [],
                    id: `${allPlans.length}`
                };
                //console.log("newSem length: ", newSemesters.length);
                planAdder(newPlan);
                break;
            }
            case "deletePlan": {
                // delete course
                planDeleter();
                break;
            }
        }
    };
    // This is the Return View
    return (
        <div>
            {/** This is where the new code for checking correctness is going to go */}
            <Form.Group controlId="userPlan">
                <Form.Label>Choose your current plan</Form.Label>
                <Form.Select value={curPlan.id} onChange={updatePlan}>
                    {allPlans.map(
                        (plan: Plan, ind: number): JSX.Element => (
                            <option key={ind} value={ind}>
                                {" "}
                                {plan.name}{" "}
                            </option>
                        )
                    )}
                </Form.Select>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Form.Label>Choose your planned concentration</Form.Label>
                </Col>
                <Col>
                    <Form.Select
                        value={currentConcentration}
                        onChange={updateCurrentConcentration}
                    >
                        <option value="Artificial Intelligence">
                            Artificial Intelligence
                        </option>
                        <option value="Bioinformatics">Bioinformatics</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Data Science">Data Science</option>
                        <option value="High Performance Computing (Data Track)">
                            High Performance Computing (Data Track)
                        </option>
                        <option value="High Performance Computing (Math Track)">
                            High Performance Computing (Math Track)
                        </option>
                        <option value="Systems and Networking">
                            Systems and Networking
                        </option>
                        <option value="Theory and Computation (Discrete Track)">
                            Theory and Computation (Discrete Track)
                        </option>
                        <option value="Theory and Computation (Continuous Track)">
                            Theory and Computation (Continuous Track)
                        </option>
                        <option value="Traditional Computer Science (BS)">
                            Traditional Computer Science (BS)
                        </option>
                    </Form.Select>
                </Col>
            </Form.Group>
            {checkPlan(curPlan, currentConcentration)}
            {/* The user is at <>/*{curPlan.name}</></>. */}
            {/** Collect the total credit hours for all of the Semesters */}
            {/** This is the title area */}
            <div
                style={{
                    textAlign: "left",
                    marginLeft: "20px",
                    marginRight: "20px",
                    marginTop: "10px"
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginRight: "20px",
                        marginBottom: "0px"
                    }}
                >
                    <Button
                        onClick={() =>
                            updateSemesterCourse({
                                course: undefined,
                                semesterIndex: 0,
                                courseIndex: 0,
                                opType: "addPlan"
                            })
                        }
                    >
                        New Plan
                    </Button>
                    <Button
                        onClick={() =>
                            updateSemesterCourse({
                                course: undefined,
                                semesterIndex: 0,
                                courseIndex: 0,
                                opType: "deletePlan"
                            })
                        }
                    >
                        Discard Plan
                    </Button>
                </div>

                <Form.Group as={Row} style={{ marginBottom: "0px" }}>
                    <Col style={{ textAlign: "left", marginBottom: "0px" }}>
                        <h4 style={{ marginBottom: "0px" }}>
                            <strong>{curPlan.name}</strong>
                        </h4>
                    </Col>
                    <Col
                        style={{
                            textAlign: "right",
                            marginRight: "20px",
                            marginBottom: "0px"
                        }}
                    >
                        <Button
                            onClick={() =>
                                updateSemesterCourse({
                                    course: undefined,
                                    semesterIndex: 0,
                                    courseIndex: 0,
                                    opType: "addSemester"
                                })
                            }
                        >
                            Add Semester
                        </Button>
                        {"   "}
                    </Col>
                </Form.Group>
                <p>Total Credit Hours in this Plan: {totalCredits}</p>
            </div>
            {curPlan.semesters.map((eachSemester: Semester, ind: number) => {
                return (
                    <SemesterViewer
                        semesterIndex={ind}
                        semester={eachSemester}
                        courses={eachSemester.courses}
                        semesterInputID={ind}
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
                        clearSemester={(semesterIndex: number) =>
                            updateSemesterCourse({
                                semesterIndex,
                                opType: "clear"
                            })
                        }
                        moveCourseUp={(
                            course: Course,
                            semesterIndex: number,
                            courseIndex: number
                        ) =>
                            updateSemesterCourse({
                                course,
                                semesterIndex,
                                courseIndex,
                                opType: "moveup"
                            })
                        }
                        moveCourseDown={(
                            course: Course,
                            semesterIndex: number,
                            courseIndex: number
                        ) =>
                            updateSemesterCourse({
                                course,
                                semesterIndex,
                                courseIndex,
                                opType: "movedown"
                            })
                        }
                        moveCourseToSemester={(
                            course: Course,
                            semesterIndex: number,
                            courseIndex: number,
                            semesterInputID: number
                        ) =>
                            updateSemesterCourse({
                                course,
                                semesterIndex,
                                courseIndex,
                                semesterInputID,
                                opType: "moveCourseToSemester"
                            })
                        }
                        deleteSemester={(semesterIndex: number) =>
                            updateSemesterCourse({
                                semesterIndex,
                                opType: "deleteSemester"
                            })
                        }
                    />
                );
            })}
        </div>
    );
}
