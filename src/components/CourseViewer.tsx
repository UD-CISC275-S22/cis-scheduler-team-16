import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Course } from "../templates/course";

export function CourseViewer({ course }: { course: Course }): JSX.Element {
    const [editMode, setEditMode] = useState<boolean>(false);
    {
        /** Add state here to allow users to edit data */
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
                        <p style={{ marginBottom: "0px" }}>
                            <h4 style={{ marginBottom: "0px" }}>
                                <strong>{course.courseId}</strong>
                            </h4>
                            <h5 style={{ marginBottom: "0px" }}>
                                {course.name}
                            </h5>
                            {course.credithours} Credits
                        </p>

                        <Col>
                            <strong>Prerequisites: </strong>
                            {course.prereqs.length != 0
                                ? course.prereqs.join(", ")
                                : "None"}
                        </Col>
                    </Col>
                    <Col
                        style={{
                            textAlign: "right",
                            marginRight: "20px",
                            marginTop: "20px"
                        }}
                    >
                        <Button>▲</Button>
                        {"  "}
                        <Button>▼</Button>
                        {"  "}
                        <Button onClick={() => setEditMode(!editMode)}>
                            {editMode ? "Cancel Changes" : "Edit"}
                        </Button>
                        {"  "}
                        <Button
                            style={{
                                backgroundColor: "red",
                                outlineColor: "slategray"
                            }}
                        >
                            Delete
                        </Button>
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
                            <Form.Control value={course.name}></Form.Control>
                        </Col>
                    </Form.Group>

                    {/** Displays Course ID Title Box / Edit Box Horizontally */}
                    <Form.Group as={Row}>
                        <Col>
                            <p style={{ marginBottom: "0px" }}>Course ID</p>
                        </Col>
                        <Col>
                            <Form.Control
                                value={course.courseId}
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
                                value={course.prereqs.join(", ")}
                            ></Form.Control>
                        </Col>
                    </Form.Group>

                    {/** Displays radio buttons letting the user select what requirements are fulfilled */}
                    {/** ADD HERE */}

                    {/** Save button for changes made in the overwriting form */}
                    <div style={{ textAlign: "right" }}>
                        <Button
                            style={{
                                backgroundColor: "green",
                                borderColor: "green",
                                marginBottom: "20px",
                                marginTop: "20px"
                            }}
                        >
                            Save Changes
                        </Button>
                        {"  "}
                        <Button
                            style={{
                                backgroundColor: "slategray",
                                borderColor: "darkgray"
                            }}
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
