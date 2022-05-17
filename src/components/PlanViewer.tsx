import React, { useState } from "react";
import { Button, Col, Row, Form, Container } from "react-bootstrap";
import { Course } from "../templates/course";
import { Semester } from "../templates/semester";
import { SemesterViewer } from "./SemesterViewer";
import { Plan } from "../templates/plan";
import { checkPlan } from "./utility/PlanTester";
import { generateCoursePool } from "./utility/GenerateCoursePool";
import { DisplayMessage } from "./utility/DisplayMessage";
import { updatePlanCSV } from "./utility/UpdatePlanCSV";
import { updateSemesterCourse } from "./utility/UpdatePlanSemesterCourses";
import { getInitialPlans } from "./utility/GetInitialPlans";

const termList: string[] = ["Summer", "Fall", "Winter", "Spring"];

//Read in data from the browser cache if it exists!
let savedPlanArray: Plan[] = [];
const saveDataKey = "PLANNER_DATA_KEY";
const previousData = localStorage.getItem(saveDataKey);
if (previousData !== null) {
    savedPlanArray = JSON.parse(previousData);
}

export function PlanViewer(): JSX.Element {
    //This little bit of code figures out if we should use the saved data from the browser
    //or load in data from the default plan we've included
    let INIT_PLAN_DATA: Plan[] = [];
    const INITIAL_PLANS: Plan[] = getInitialPlans();
    if (savedPlanArray.length !== 0) {
        INIT_PLAN_DATA = savedPlanArray;
    } else {
        INIT_PLAN_DATA = INITIAL_PLANS;
    }

    // This is the State
    const [allPlans, setAllPlans] = useState<Plan[]>(INIT_PLAN_DATA); //changed from planSave initial value
    const [curPlan, setCurPlan] = useState<Plan>(allPlans[0]);
    const [currentConcentration, setCurrentConcentration] = useState<string>(
        "Traditional Computer Science (BS)"
    );
    const [editSem, setEditSem] = useState<boolean>(false); //boolean state for editable state
    const [term, setTerm] = useState<string>("Fall"); //term to set a new semester to
    const [year, setYear] = useState<number>(0); //year to set a new semester to
    const [poolTerm, setPoolTerm] = useState<string>("Fall");
    const [poolYear, setPoolYear] = useState<number>(2022);
    const [poolEntry, setPoolEntry] = useState<string>("");
    const [importVisible, setImportVisible] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [modalHeader, setModalHeader] = useState<string>("");
    const [content, setContent] = useState<string>("No file data uploaded");

    //Set up the course pool for the current Plan:
    const COURSE_POOL: Course[] = generateCoursePool(curPlan.semesters);

    // Get the total number of credit hours for this Plan
    let totalCredits = 0;
    curPlan.semesters.map((semester: Semester) =>
        semester.courses.map(
            (course: Course) => (totalCredits += course.credithours)
        )
    );

    const CSVdata: string[][] = [
        [
            "Semesters",
            "Years",
            "Courses",
            "CourseID",
            "Credits",
            "Prereqs",
            "Requirements"
        ]
    ];

    function uploadFile(event: React.ChangeEvent<HTMLInputElement>) {
        // Might have removed the file, need to check that the files exist
        if (event.target.files && event.target.files.length) {
            // Get the first filename
            const filename = event.target.files[0];
            // Create a reader
            const reader = new FileReader();
            // Create lambda callback to handle when we read the file
            reader.onload = (loadEvent) => {
                // Target might be null, so provide default error value
                const newContent =
                    loadEvent.target?.result || "Data was not loaded";
                // FileReader provides string or ArrayBuffer, force it to be string
                setContent(newContent as string);
            };
            // Actually read the file
            reader.readAsText(filename);
        }
    }

    //This is the Control
    function updatePlan(event: React.ChangeEvent<HTMLSelectElement>) {
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

    function updatePoolTerm(event: React.ChangeEvent<HTMLSelectElement>) {
        setPoolTerm(event.target.value);
    }

    function addFromCoursePool() {
        let foundCourse: Course;
        let courseExists = false;

        COURSE_POOL.map((course: Course) => {
            if (
                course.backup.courseId.toLowerCase() === poolEntry.toLowerCase()
            ) {
                foundCourse = course;
                courseExists = true;
            }
        });

        if (courseExists) {
            curPlan.semesters.map((semester: Semester, index: number) => {
                if (
                    semester.term.toLowerCase() === poolTerm.toLowerCase() &&
                    semester.year === poolYear
                ) {
                    updateSemesterCourse({
                        curPlan: curPlan,
                        setCurPlan,
                        course: foundCourse,
                        semesterIndex: index,
                        opType: "addFromPool",
                        planSetter,
                        setModalMessage,
                        setModalHeader,
                        setShowMessage
                    });

                    setModalMessage(
                        `Successfully added ${poolEntry} to ${semester.term} ${semester.year}`
                    );
                    setModalHeader("Action Successful");
                    setShowMessage(true);
                }
            });
        } else {
            setModalHeader("Action Unsuccessful");
            setModalMessage(
                `Was unable to add ${poolEntry} to ${poolTerm} ${poolYear}. Did you spell the course code incorrectly, or is the course already in your plan?`
            );
            setShowMessage(true);
        }
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

    // This is the Return View
    return (
        <div>
            <hr></hr>
            {showMessage && (
                <DisplayMessage
                    show={showMessage}
                    handleClose={() => setShowMessage(false)}
                    header={modalHeader}
                    message={modalMessage}
                ></DisplayMessage>
            )}
            {/**COURSE_POOL.map((course: Course) => course.courseId + " ")*/}
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
                            data-testId="plan-dropdown"
                        >
                            {allPlans.map(
                                (plan: Plan): JSX.Element => (
                                    <option key={plan.id} value={plan.id}>
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
                            data-testId="concentration-dropdown"
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
                                        curPlan: curPlan,
                                        setCurPlan,
                                        course: undefined,
                                        semesterIndex: 0,
                                        courseIndex: 0,
                                        allPlans: allPlans,
                                        setAllPlans,
                                        opType: "addPlan",
                                        planSetter,
                                        setModalMessage,
                                        setModalHeader,
                                        setShowMessage
                                    })
                                }
                                style={{ marginTop: "5px", marginRight: "5px" }}
                                data-testId="add-plan-button"
                            >
                                New Plan
                            </Button>
                            <Button
                                onClick={() =>
                                    updateSemesterCourse({
                                        curPlan: curPlan,
                                        setCurPlan,
                                        course: undefined,
                                        semesterIndex: 0,
                                        courseIndex: 0,
                                        allPlans: allPlans,
                                        setAllPlans,
                                        opType: "deletePlan",
                                        planSetter,
                                        setModalMessage,
                                        setModalHeader,
                                        setShowMessage
                                    })
                                }
                                style={{ marginRight: "5px", marginTop: "5px" }}
                                data-testId="delete-plan-button"
                            >
                                Discard Plan
                            </Button>
                            <Button
                                data-testId="save-plan-button"
                                onClick={() => {
                                    localStorage.setItem(
                                        saveDataKey,
                                        JSON.stringify(allPlans)
                                    );
                                    setModalMessage(
                                        "Plans will be remembered on next page load"
                                    );
                                    setModalHeader("Plan Saved!");
                                    setShowMessage(true);
                                }}
                                style={{ marginRight: "5px", marginTop: "5px" }}
                            >
                                Save To Browser Cache
                            </Button>
                            <Button
                                data-testId="clear-cache-button"
                                style={{ marginRight: "5px", marginTop: "5px" }}
                                onClick={() => {
                                    localStorage.setItem(
                                        saveDataKey,
                                        JSON.stringify("")
                                    );
                                    setModalMessage(
                                        "Successfully cleared your plans from the browser cache. Please reload the page for these changes to take effect"
                                    );
                                    setModalHeader("Browser Cache Cleared");
                                    setShowMessage(true);
                                }}
                            >
                                Clear Browser Cache
                            </Button>
                            <Button
                                data-testId="export-csv-button"
                                style={{ marginRight: "5px", marginTop: "5px" }}
                                onClick={() => {
                                    for (
                                        let i = 0;
                                        i < curPlan.semesters.length;
                                        i++
                                    ) {
                                        const courses =
                                            curPlan.semesters[i].courses;
                                        const semesterName =
                                            curPlan.semesters[i].term;
                                        const semesterYear =
                                            curPlan.semesters[
                                                i
                                            ].year.toString();
                                        for (const eachcourse of courses) {
                                            const courseName =
                                                eachcourse.name.replace(
                                                    ",",
                                                    ""
                                                );
                                            const courseID =
                                                eachcourse.courseId;
                                            const credits =
                                                eachcourse.credithours.toString();

                                            let prereqs = eachcourse.prereqs
                                                .join("/")
                                                .toString()
                                                .replace(",", "/");
                                            if (
                                                eachcourse.prereqs.join("/") ===
                                                ""
                                            )
                                                prereqs = "None";
                                            let reqs =
                                                eachcourse.satisfied_requirements.join(
                                                    "/"
                                                );
                                            if (
                                                eachcourse.satisfied_requirements.join(
                                                    "/"
                                                ) === ""
                                            )
                                                reqs = "None";
                                            CSVdata.push([
                                                semesterName,
                                                semesterYear,
                                                courseName,
                                                courseID,
                                                credits,
                                                prereqs,
                                                reqs + ","
                                            ]);
                                        }
                                    }

                                    const csvContent = `data:text/csv;charset=utf-8,${CSVdata.map(
                                        (e) => e.join(",")
                                    ).join("\n")}`;

                                    const encodedUri = encodeURI(csvContent);
                                    const link = document.createElement("a");
                                    link.setAttribute("href", encodedUri);
                                    link.setAttribute("download", curPlan.name);
                                    document.body.appendChild(link);
                                    link.click();
                                }}
                            >
                                Export CSV
                            </Button>
                            <Button
                                onClick={() => setImportVisible(!importVisible)}
                                style={{ marginRight: "5px", marginTop: "5px" }}
                                data-testId="show-hide-import-button"
                            >
                                Import CSV
                            </Button>
                            {importVisible && (
                                <div>
                                    <Form.Group controlId="exampleForm">
                                        <Form.Label>Upload a file</Form.Label>
                                        <Form.Control
                                            type="file"
                                            onChange={uploadFile}
                                        />
                                    </Form.Group>
                                    <Button
                                        data-testId="import-button"
                                        onClick={() =>
                                            updatePlanCSV({
                                                content,
                                                curPlan,
                                                setCurPlan
                                            })
                                        }
                                        style={{
                                            marginTop: "5px"
                                        }}
                                    >
                                        Import
                                    </Button>
                                </div>
                            )}
                        </Col>
                    </Form.Group>
                </div>
                <div style={{ marginBottom: "20px", marginTop: "20px" }}>
                    {checkPlan(curPlan, currentConcentration)}
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
                            data-testId="addSem-button"
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
                        style={{
                            marginLeft: "20px",
                            marginRight: "20px",
                            borderColor: "darkslategray",
                            backgroundColor: "#EDEDED",
                            borderRadius: "5px",
                            borderWidth: "1px",
                            borderStyle: "solid"
                        }}
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
                                        data-testId="term-dropdown"
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
                                        data-testId="year-textbox"
                                    />
                                </Col>
                            </Row>
                            <p> </p>
                            <Button
                                style={{
                                    backgroundColor: "green",
                                    borderStyle: "none"
                                }}
                                onClick={() =>
                                    updateSemesterCourse({
                                        curPlan: curPlan,
                                        setCurPlan,
                                        course: undefined,
                                        semesterIndex: 0,
                                        courseIndex: 0,
                                        opType: "addSemester",
                                        term: term,
                                        year: year,
                                        planSetter,
                                        setModalMessage,
                                        setModalHeader,
                                        setShowMessage,
                                        editSem: editSem,
                                        setEditSem
                                    })
                                }
                                data-testId="insertSem-button"
                            >
                                Insert
                            </Button>
                            {"  "}
                            <Button
                                data-testId="cancelSem-button"
                                style={{
                                    backgroundColor: "red",
                                    borderStyle: "none"
                                }}
                                onClick={() => setEditSem(!editSem)}
                            >
                                Cancel
                            </Button>
                        </Container>
                        <p> </p>
                    </div>
                )}
                <p>Total Credit Hours in this Plan: {totalCredits}</p>
            </div>
            <hr></hr>
            {/** Users can add courses from the course pool to the semester */}
            <div style={{ marginLeft: "10%", marginRight: "10%" }}>
                <h5>
                    <strong>
                        Add Course from University of Delaware Course Pool
                    </strong>
                </h5>
                <Form.Label>
                    Please enter the Course ID of your desired course
                </Form.Label>
                <Form.Control
                    data-testId="course-pool-entry-box"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setPoolEntry(event.target.value.replace(" ", ""))
                    }
                ></Form.Control>
                <Form.Label style={{ marginTop: "5px" }}>
                    Pick a term and year
                </Form.Label>
                <Row>
                    <Col style={{ marginLeft: "35%" }}>
                        <Form.Select
                            value={poolTerm}
                            onChange={updatePoolTerm}
                            data-testId="course-pool-term-dropdown"
                        >
                            {termList.map((newTerm: string) => (
                                <option key={newTerm} value={newTerm}>
                                    {newTerm}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                    <Col style={{ marginRight: "35%" }}>
                        <Form.Control
                            value={poolYear}
                            onChange={(
                                event: React.ChangeEvent<HTMLInputElement>
                            ) => setPoolYear(parseInt(event.target.value) || 0)}
                            data-testId="course-pool-year-textbox"
                        />
                    </Col>
                </Row>
                <Button
                    style={{
                        backgroundColor: "green",
                        marginTop: "10px",
                        marginBottom: "20px",
                        borderStyle: "none"
                    }}
                    data-testId="submit-course-pool-button"
                    onClick={addFromCoursePool}
                >
                    Add Course
                </Button>
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
                                curPlan: curPlan,
                                setCurPlan,
                                course,
                                semesterIndex,
                                opType: "add",
                                planSetter,
                                setModalMessage,
                                setModalHeader,
                                setShowMessage
                            })
                        }
                        deleteCourse={(
                            semesterIndex: number,
                            courseIndex: number
                        ) => {
                            updateSemesterCourse({
                                curPlan: curPlan,
                                setCurPlan,
                                semesterIndex: semesterIndex,
                                courseIndex: courseIndex,
                                opType: "delete",
                                planSetter,
                                setModalMessage,
                                setModalHeader,
                                setShowMessage
                            });
                        }}
                        updateCourse={(
                            course: Course,
                            semesterIndex: number,
                            courseIndex: number
                        ) => {
                            updateSemesterCourse({
                                curPlan: curPlan,
                                setCurPlan,
                                course,
                                semesterIndex,
                                courseIndex,
                                opType: "update",
                                planSetter,
                                setModalMessage,
                                setModalHeader,
                                setShowMessage
                            });
                        }}
                        clearSemester={(semesterIndex: number) =>
                            updateSemesterCourse({
                                curPlan,
                                setCurPlan,
                                semesterIndex,
                                opType: "clear",
                                planSetter,
                                setModalMessage,
                                setModalHeader,
                                setShowMessage
                            })
                        }
                        moveCourseUp={(
                            course: Course,
                            semesterIndex: number,
                            courseIndex: number
                        ) =>
                            updateSemesterCourse({
                                curPlan: curPlan,
                                setCurPlan,
                                course,
                                semesterIndex,
                                courseIndex,
                                opType: "moveup",
                                planSetter,
                                setModalMessage,
                                setModalHeader,
                                setShowMessage
                            })
                        }
                        moveCourseDown={(
                            course: Course,
                            semesterIndex: number,
                            courseIndex: number
                        ) =>
                            updateSemesterCourse({
                                curPlan: curPlan,
                                setCurPlan,
                                course,
                                semesterIndex,
                                courseIndex,
                                opType: "movedown",
                                planSetter,
                                setModalMessage,
                                setModalHeader,
                                setShowMessage
                            })
                        }
                        moveCourseToSemester={(
                            course: Course,
                            semesterIndex: number,
                            courseIndex: number,
                            semesterInputID: string
                        ) =>
                            updateSemesterCourse({
                                curPlan: curPlan,
                                setCurPlan,
                                course,
                                semesterIndex,
                                courseIndex,
                                semesterInputID,
                                opType: "moveCourseToSemester",
                                planSetter,
                                setModalMessage,
                                setModalHeader,
                                setShowMessage
                            })
                        }
                        deleteSemester={(semesterIndex: number) =>
                            updateSemesterCourse({
                                curPlan: curPlan,
                                setCurPlan,
                                semesterIndex,
                                opType: "deleteSemester",
                                planSetter,
                                setModalMessage,
                                setModalHeader,
                                setShowMessage
                            })
                        }
                    />
                );
            })}
        </div>
    );
}
