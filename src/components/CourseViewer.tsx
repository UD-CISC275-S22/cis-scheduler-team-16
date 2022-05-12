import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Course } from "../templates/course";

type ChangeEvent = React.ChangeEvent<
    HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
>;
type CourseViewerProps = {
    course: Course;
    deleteCourse: (semesterIndex: number, courseIndex: number) => void;
    updateCourse: (
        course: Course,
        semesterIndex: number,
        courseIndex: number
    ) => void;
    semesterIndex: number;
    courseIndex: number;
    semesterInputID: string;
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
};

export function CourseViewer({
    course,
    deleteCourse,
    updateCourse,
    semesterIndex,
    courseIndex,
    moveCourseUp,
    moveCourseDown,
    moveCourseToSemester
}: CourseViewerProps): JSX.Element {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [moveMode, setMoveMode] = useState<boolean>(false);
    const [moveName, setMoveName] = useState<string>("");
    const [courseID, setCourseId] = useState<string>(course.courseId);
    const [courseName, setCourseName] = useState<string>(course.name);
    const [creditHours, setCreditHours] = useState<number>(course.credithours);
    const [prerequisites, setPrerequisites] = useState<string>(
        course.prereqs.join(", ")
    );
    const [requirements, setRequirements] = useState<string[]>(
        course.satisfied_requirements
    );

    /** Creates an updated array of Course objects that gets passed up to Semester Viewer */

    function updateCourseId(event: ChangeEvent) {
        setCourseId(event.target.value);
    }

    function updateCourseName(event: ChangeEvent) {
        setCourseName(event.target.value);
    }

    function updateMoveName(event: ChangeEvent) {
        setMoveName(event.target.value);
    }

    function updateRequirements(event: ChangeEvent) {
        const requirement = event.target.value;
        if (requirements.includes(requirement)) {
            setRequirements(
                requirements.filter((input) => input !== requirement)
            );
        } else {
            setRequirements([...requirements, requirement]);
        }
    }

    function updateCreditHours(event: ChangeEvent) {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value >= 0) {
            setCreditHours(parseInt(event.target.value) || 0);
        }
    }

    function updatePrerequisites(event: ChangeEvent) {
        setPrerequisites(event.target.value);
    }

    return (
        <div
            style={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "10px",
                marginBottom: "10px",
                borderColor: "darkslategray",
                backgroundColor: "#EDEDED",
                borderRadius: "5px",
                borderWidth: "1px",
                borderStyle: "solid"
            }}
        >
            {/** Main Body of the Component. Displays course information
             *   Including:
             *      - Course Code/Name
             *      - Number of Credit Hours
             *      - Prerequisites
             */}
            <div style={{ textAlign: "left" }}>
                <Form.Group as={Row}>
                    <Col style={{ marginLeft: "20px" }}>
                        <h4 style={{ marginBottom: "0px" }}>
                            <strong>{course.courseId}</strong>
                        </h4>
                        <h5 style={{ marginBottom: "0px" }}>{course.name}</h5>
                        <p style={{ marginBottom: "0px" }}>
                            {course.credithours} Credits
                        </p>

                        <strong>Prerequisites: </strong>
                        {course.prereqs.length != 0
                            ? course.prereqs.join(", ")
                            : "None"}
                        <br></br>
                        {/** Displays the requirements this course counts towards if there are any */}
                        {course.satisfied_requirements.length !== 0 && (
                            <div>
                                <strong>This Course Fulfills: </strong>
                                {course.satisfied_requirements.join(", ")}
                            </div>
                        )}
                    </Col>
                    <Col
                        style={{
                            textAlign: "right",
                            marginRight: "20px",
                            marginTop: "20px"
                        }}
                    >
                        <Button
                            data-testID="move-course-button"
                            onClick={() => {
                                setMoveMode(!moveMode);
                                setEditMode(false);
                            }}
                        >
                            {moveMode ? "Close Move Menu" : "Move"}
                        </Button>

                        {"  "}
                        <Button
                            data-testID="course-edit-button"
                            onClick={() => {
                                setEditMode(!editMode);
                                setMoveMode(false);
                            }}
                        >
                            {editMode ? "Close" : "Edit"}
                        </Button>
                        {"  "}
                        <Button
                            data-testID="course-delete-button"
                            style={{
                                backgroundColor: "red",
                                outlineColor: "slategray"
                            }}
                            onClick={() =>
                                deleteCourse(semesterIndex, courseIndex)
                            }
                        >
                            Delete
                        </Button>
                        <br></br>
                        {moveMode && (
                            <div style={{ marginTop: "5px" }}>
                                <Button
                                    style={{ marginRight: "5px" }}
                                    data-testID="move-course-up-button"
                                    onClick={() =>
                                        moveCourseUp(
                                            course,
                                            semesterIndex,
                                            courseIndex
                                        )
                                    }
                                >
                                    ▲
                                </Button>
                                <Button
                                    data-testID="move-course-down-button"
                                    onClick={() =>
                                        moveCourseDown(
                                            course,
                                            semesterIndex,
                                            courseIndex
                                        )
                                    }
                                >
                                    ▼
                                </Button>
                                <p>
                                    {" "}
                                    <h4>Move Course to another Semester:</h4>
                                    Enter the term and the year of your semester
                                    here:
                                    <p>(ex: Spring 2022)</p>
                                </p>
                                <Form.Control
                                    style={{
                                        marginLeft: "auto",
                                        marginRight: "0px",
                                        marginBottom: "5px",
                                        width: "20%"
                                    }}
                                    data-testID="change-semester-box"
                                    value={moveName}
                                    onChange={updateMoveName}
                                ></Form.Control>

                                <Button
                                    data-testID="change-semester-button"
                                    style={{ marginBottom: "5px" }}
                                    onClick={() =>
                                        moveCourseToSemester(
                                            course,
                                            semesterIndex,
                                            courseIndex,
                                            moveName
                                        )
                                    }
                                >
                                    Go
                                </Button>
                            </div>
                        )}
                    </Col>
                </Form.Group>
            </div>

            {/** Displays the components that let a user override the course details: */}
            {editMode && (
                <div
                    style={{
                        marginLeft: "20px",
                        marginRight: "20px",
                        marginTop: "20px",
                        textAlign: "left"
                    }}
                >
                    <hr></hr>
                    <h5>
                        <strong>Overwrite Course Properties</strong>
                    </h5>
                    <p>
                        This will change the requirements and properties of this
                        course. Make sure you know what you are chaning and get
                        assistance from a department advisor.
                    </p>

                    {/** Displays Course Name Title Box / Edit Box Horizontally */}
                    <Form.Group as={Row}>
                        <Col>
                            <p style={{ marginBottom: "0px" }}>Course Name</p>
                        </Col>
                        <Col>
                            <Form.Control
                                data-testID="change-course-name-box"
                                value={courseName}
                                onChange={updateCourseName}
                            ></Form.Control>
                        </Col>
                    </Form.Group>

                    {/** Displays Course ID Title Box / Edit Box Horizontally */}
                    <Form.Group as={Row}>
                        <Col>
                            <p style={{ marginBottom: "0px" }}>Course ID</p>
                        </Col>
                        <Col>
                            <Form.Control
                                data-testID="change-course-id-box"
                                value={courseID}
                                onChange={updateCourseId}
                            ></Form.Control>
                        </Col>
                    </Form.Group>

                    {/** Displays Credit Hours Box / Edit Box Horizontally */}
                    <Form.Group as={Row}>
                        <Col>
                            <p style={{ marginBottom: "0px" }}>Credit Hours</p>
                        </Col>
                        <Col>
                            <Form.Control
                                data-testID="change-course-credits-box"
                                type="number"
                                value={creditHours}
                                onChange={updateCreditHours}
                            ></Form.Control>
                        </Col>
                    </Form.Group>

                    {/** Displays Prerequisites Title Box / Edit Box Horizontally */}
                    <Form.Group as={Row}>
                        <Col>
                            <p style={{ marginBottom: "0px" }}>Prerequisites</p>
                        </Col>
                        <Col>
                            <Form.Control
                                data-testID="change-course-prereqs-box"
                                value={prerequisites}
                                onChange={updatePrerequisites}
                            ></Form.Control>
                        </Col>
                    </Form.Group>

                    {/** Displays radio buttons letting the user select what requirements are fulfilled
                     *
                     * University/Engieering Requirements:
                     *
                     *   - Seminar in Composition (ENGL110)
                     *   - First Year Seminar (FYS)
                     *   - Discovery Learning Experience (DLE)
                     *   - Multicultural Requirement
                     *   - Creative Arts and Humanities
                     *   - History and Cultural Change
                     *   - Social and Behavioral Sciences
                     *   - Mathematics, Natural Sciences, and Technology
                     *   - Capstone Experience
                     *   - Upper Level Credit
                     *   - Career and Professional Preparation
                     *   - College of Engineering Upper Level Breadth
                     *
                     */}
                    <Form.Group as={Row}>
                        <Col>
                            <p style={{ marginBottom: "0px" }}>
                                Universtiy/COE Requirements
                            </p>
                        </Col>
                        <Col>
                            <Form.Check
                                data-testID="sem-radio-button"
                                type="checkbox"
                                id={`requirements-sem-${courseID}`}
                                label="Seminar in Composition (ENGL110)"
                                name={`requirements-${courseID}`}
                                value="sem"
                                checked={requirements.includes("sem")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="fys-radio-button"
                                type="checkbox"
                                id={`requirements-fys-${courseID}`}
                                label="First Year Seminar (FYS)"
                                name={`requirements-${courseID}`}
                                value="fys"
                                checked={requirements.includes("fys")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="dle-radio-button"
                                type="checkbox"
                                id={`requirements-dle-${courseID}`}
                                label="Discovery Learning Experience (DLE)"
                                name={`requirements-${courseID}`}
                                value="dle"
                                checked={requirements.includes("dle")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="mul-radio-button"
                                type="checkbox"
                                id={`requirements-mul-${courseID}`}
                                label="Multicultural"
                                name={`requirements-${courseID}`}
                                value="mul"
                                checked={requirements.includes("mul")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="cah-radio-button"
                                type="checkbox"
                                id={`requirements-cah-${courseID}`}
                                label="Creative Arts and Humanities"
                                name={`requirements-${courseID}`}
                                value="cah"
                                checked={requirements.includes("cah")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="hcc-radio-button"
                                type="checkbox"
                                id={`requirements-hcc-${courseID}`}
                                label="History and Cultural Change"
                                name={`requirements-${courseID}`}
                                value="hcc"
                                checked={requirements.includes("hcc")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="sbs-radio-button"
                                type="checkbox"
                                id={`requirements-sbs-${courseID}`}
                                label="Social and Behavioral Changes"
                                name={`requirements-${courseID}`}
                                value="sbs"
                                checked={requirements.includes("sbs")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="mnt-radio-button"
                                type="checkbox"
                                id={`requirements-mnt-${courseID}`}
                                label="Mathematics, Natural Sciences, and Technology"
                                name={`requirements-${courseID}`}
                                value="mnt"
                                checked={requirements.includes("mnt")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="cap-radio-button"
                                type="checkbox"
                                id={`requirements-cap-${courseID}`}
                                label="Capstone Experience"
                                name={`requirements-${courseID}`}
                                value="cap"
                                checked={requirements.includes("cap")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="ulc-radio-button"
                                type="checkbox"
                                id={`requirements-ulc-${courseID}`}
                                label="Upper Level Credit"
                                name={`requirements-${courseID}`}
                                value="ulc"
                                checked={requirements.includes("ulc")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="cpp-radio-button"
                                type="checkbox"
                                id={`requirements-cpp-${courseID}`}
                                label="Career and Professional Preparation"
                                name={`requirements-${courseID}`}
                                value="cpp"
                                checked={requirements.includes("cpp")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="upp-radio-button"
                                type="checkbox"
                                id={`requirements-upp-${courseID}`}
                                label="College of Engineering Upper Level Breadth"
                                name={`requirements-${courseID}`}
                                value="upp"
                                checked={requirements.includes("upp")}
                                onChange={updateRequirements}
                            />
                            <Form.Check
                                data-testID="caf-radio-button"
                                type="checkbox"
                                id={`requirements-caf-${courseID}`}
                                label="Traditional Computer Science Custom Area of Focus Requirement"
                                name={`requirements-${courseID}`}
                                value="caf"
                                checked={requirements.includes("caf")}
                                onChange={updateRequirements}
                            />
                        </Col>
                    </Form.Group>

                    {/** Save Changes */}
                    <div style={{ textAlign: "right", marginBottom: "20px" }}>
                        <Button
                            data-testID="save-course-edit-button"
                            style={{
                                backgroundColor: "green",
                                borderColor: "lightslategray"
                            }}
                            onClick={() =>
                                updateCourse(
                                    {
                                        courseId: courseID,
                                        name: courseName,
                                        prereqs:
                                            prerequisites !== ""
                                                ? prerequisites.split(", ")
                                                : ["None"],
                                        credithours: creditHours,
                                        satisfied_requirements: requirements,
                                        backup: course.backup
                                    },
                                    semesterIndex,
                                    courseIndex
                                )
                            }
                        >
                            Save
                        </Button>
                        {"  "}
                        <Button
                            data-testID="restore-default-properties-button"
                            style={{
                                backgroundColor: "slategray",
                                borderColor: "darkgray"
                            }}
                            onClick={() =>
                                updateCourse(
                                    {
                                        courseId: course.backup.courseId,
                                        name: course.backup.name,
                                        prereqs: course.backup.prereqs,
                                        credithours: course.backup.credithours,
                                        satisfied_requirements:
                                            course.backup
                                                .satisfied_requirements,
                                        backup: course.backup
                                    },
                                    semesterIndex,
                                    courseIndex
                                )
                            }
                        >
                            Restore to Defaults
                        </Button>
                        {/** ADD A BUTTON HERE THAT ALLOWS THE USER TO RESTORE THE COURSE TO ITS DEFAULTS */}
                    </div>
                </div>
            )}
        </div>
    );
}
