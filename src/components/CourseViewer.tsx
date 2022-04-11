import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Course } from "../templates/course";

export function CourseViewer({ course }: { course: Course }): JSX.Element {
    return (
        <div
            style={{
                marginLeft: "20px",
                marginRight: "20px",
                marginTop: "20px",
                borderColor: "darkslategray",
                borderRadius: "5px",
                borderWidth: "1px",
                borderStyle: "solid",
                textAlign: "left"
            }}
        >
            <div>
                <Form.Group as={Row}>
                    <Col style={{ marginLeft: "20px" }}>
                        <p style={{ marginBottom: "0px" }}>
                            <h4 style={{ marginBottom: "0px" }}>
                                <strong>{course.courseId}</strong>
                            </h4>
                            {course.credithours} Credits
                        </p>
                        <h5>{course.name}</h5>
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
                        <Button>Edit</Button>
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
        </div>
    );
}
