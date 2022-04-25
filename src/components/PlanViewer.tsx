import React, { useState } from "react";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { Course } from "../templates/course";
import { Semester } from "../templates/semester";
//import { CourseViewer } from "./CourseViewer";
import { SemesterViewer } from "./SemesterViewer";
import { Plan } from "../templates/plan";
import planList from "../templates/PlansList.json";
import { checkPlan } from "./utility/PlanTester";

const termList: string[] = ["Summer", "Fall", "Winter", "Spring"]; //list of diff terms

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
    const [editSem, setEditSem] = useState<boolean>(false); //boolean state for editable state
    const [term, setTerm] = useState<string>("Fall"); //term to set a new semester to
    const [year, setYear] = useState<number>(0); //year to set a new semester to

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
    function updateTerm(event: React.ChangeEvent<HTMLSelectElement>) {
        setTerm(event.target.value);
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
        setEditSem(!editSem); //added to close semester edit when saved
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
        semesterInputID?: string;
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
                        {
                            ...course,
                            courseId: "COUR0" + `${semester.courses.length + 1}`
                        }
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
                    semesterInputID != ""
                ) {
                    //console.log("semesterInput: ", semesterInputID);
                    console.log("semesterInputID", semesterInputID);

                    /*
                    if (semesterIndex === semesterInputID) {
                        semester.courses = [...semester.courses, moveCourse[0]];
                    }
                    */
                    const semesterFound = curPlan.semesters.find(
                        (s) => s.term + " " + s.year === semesterInputID
                    );
                    console.log("semesterFound", semesterFound);

                    if (semesterFound !== undefined) {
                        curPlan.semesters.map((s: Semester) => {
                            if (s.term + " " + s.year === semesterInputID) {
                                console.log(
                                    "semester term and year",
                                    semester.term + " " + semester.year
                                );
                                const moveCourse = semester.courses.splice(
                                    courseIndex,
                                    1
                                );
                                s.courses = [...s.courses, moveCourse[0]];
                            }
                        });
                    }
                }
                planSetter(semesterIndex, semester);
                break;
            }
            case "addSemester": {
                // add course
                //console.log("Assembly Guy");

                const newSemester = {
                    term: term, //changed from "Blank Semester"
                    courses: [],
                    year: year, //changed from "3"
                    id: `${clonedPlan.semesters.length}`
                };
                const semesterDuplicateFound = curPlan.semesters.find(
                    (s) =>
                        s.term + " " + s.year ===
                        newSemester.term + " " + newSemester.year
                );
                //console.log("newSem length: ", newSemesters.length);
                if (semesterDuplicateFound === undefined)
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
                    name: "My Plan " + `${allPlans.length + 1}`,
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
            <hr></hr>
            <div style={{ marginLeft: "20px", marginRight: "20px" }}>
                {/** This is where the new code for checking correctness is going to go */}
                <Form.Group
                    controlId="userPlan"
                    as={Row}
                    style={{ marginRight: "10%", marginLeft: "10%" }}
                >
                    <Col style={{ textAlign: "left" }}>
                        <Form.Label>
                            <h5>
                                <strong>Choose your current plan</strong>
                            </h5>
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Select
                            value={curPlan.id}
                            onChange={updatePlan}
                            data-testID="plan-dropdown"
                        >
                            {allPlans.map(
                                (plan: Plan, ind: number): JSX.Element => (
                                    <option key={ind} value={ind}>
                                        {" "}
                                        {plan.name}{" "}
                                    </option>
                                )
                            )}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group
                    as={Row}
                    style={{ marginRight: "10%", marginLeft: "10%" }}
                >
                    <Col style={{ textAlign: "left" }}>
                        <Form.Label>
                            <h5>
                                <strong>
                                    Choose your planned concentration
                                </strong>
                            </h5>
                        </Form.Label>
                    </Col>
                    <Col>
                        <Form.Select
                            value={currentConcentration}
                            onChange={updateCurrentConcentration}
                            data-testID="concentration-dropdown"
                        >
                            <option value="Artificial Intelligence">
                                Artificial Intelligence
                            </option>
                            <option value="Bioinformatics">
                                Bioinformatics
                            </option>
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
            </div>
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
                    <Form.Group as={Row}>
                        <Col></Col>
                        <Col style={{ textAlign: "left", marginLeft: "20px" }}>
                            <Button
                                onClick={() =>
                                    updateSemesterCourse({
                                        course: undefined,
                                        semesterIndex: 0,
                                        courseIndex: 0,
                                        opType: "addPlan"
                                    })
                                }
                                data-testID="add-plan-button"
                            >
                                New Plan
                            </Button>
                            {"   "}
                            <Button
                                onClick={() =>
                                    updateSemesterCourse({
                                        course: undefined,
                                        semesterIndex: 0,
                                        courseIndex: 0,
                                        opType: "deletePlan"
                                    })
                                }
                                data-testID="delete-plan-button"
                            >
                                Discard Plan
                            </Button>
                        </Col>
                    </Form.Group>
                </div>
                <hr></hr>
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
                            data-testID="addSem-button"
                            onClick={() => setEditSem(!editSem)}
                        >
                            Add Semester
                        </Button>
                        {"   "}
                    </Col>
                </Form.Group>
                <p> </p>
                {editSem && (
                    <div
                        data-testID="editSem-div"
                        style={{
                            marginLeft: "20px",
                            marginRight: "20px",
                            borderColor: "darkslategray",
                            backgroundColor: "#EDEDED",
                            borderRadius: "5px",
                            borderWidth: "1px",
                            borderStyle: "solid"
                        }}
                        /*
                        style={{
                            borderStyle: "dotted",
                            borderWidth: "4px",
                            borderColor: "blue yellow" //rgb(0, 32, 62) //#00539f
                        }}
                        */
                    >
                        <Container>
                            <Form.Label>
                                {" "}
                                <strong> Pick a term and year </strong>{" "}
                            </Form.Label>
                            <Row>
                                <Col>
                                    <Form.Select
                                        value={term}
                                        onChange={updateTerm}
                                        data-testID="term-dropdown"
                                    >
                                        {termList.map((term: string) => (
                                            <option key={term} value={term}>
                                                {term}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Col>
                                <Col>
                                    <Form.Control
                                        value={year}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            setYear(
                                                parseInt(event.target.value) ||
                                                    0
                                            )
                                        }
                                        data-testID="year-textbox"
                                    />
                                </Col>
                            </Row>
                            <p> </p>
                            <Button
                                style={{
                                    backgroundColor: "green"
                                }}
                                onClick={() =>
                                    updateSemesterCourse({
                                        course: undefined,
                                        semesterIndex: 0,
                                        courseIndex: 0,
                                        opType: "addSemester"
                                    })
                                }
                                data-testID="insertSem-button"
                            >
                                insert
                            </Button>
                            {"  "}
                            <Button
                                data-testID="cancelSem-button"
                                style={{
                                    backgroundColor: "red"
                                }}
                                onClick={() => setEditSem(!editSem)}
                            >
                                cancel
                            </Button>
                        </Container>
                        <p> </p>
                    </div>
                )}
                <p>Total Credit Hours in this Plan: {totalCredits}</p>
                <div style={{ marginBottom: "20px" }}>
                    {checkPlan(curPlan, currentConcentration)}
                </div>
            </div>
            {curPlan.semesters.map((eachSemester: Semester, ind: number) => {
                return (
                    <SemesterViewer
                        semesterIndex={ind}
                        semester={eachSemester}
                        courses={eachSemester.courses}
                        semesterInputID={""}
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
                            semesterInputID: string
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
