import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { Course } from "../templates/course";
import { Semester } from "../templates/semester";
import { CourseViewer } from "./CourseViewer";
import { SemesterViewer } from "./SemesterViewer";
import { Plan } from "../templates/plan";
import planList from "../templates/PlansList.json";

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

    const plans: Plan[] = [
        {
            name: "myPlan1",
            id: "0",
            semesters: [
                {
                    term: "fake-semester-1",
                    year: 2022,
                    courses: []
                },
                {
                    term: "fake-semester-2",
                    year: 2022,
                    courses: []
                }
            ]
        },
        {
            name: "myPlan2",
            id: "1",
            semesters: [
                {
                    term: "fake-semester-1",
                    year: 2022,
                    courses: []
                }
            ]
        },
        {
            name: "myPlan3",
            id: "2",
            semesters: []
        }
    ];

    // This is the State
    const [allPlans, setAllPlans] = useState<Plan[]>(INITIAL_PLANS);
    const [curPlan, setCurPlan] = useState<Plan>(allPlans[0]);

    //This is the Control

    function updatePlan(event: React.ChangeEvent<HTMLSelectElement>) {
        //console.log("setting plan to : ", allPlans[+event.target.value]);
        setCurPlan(allPlans[+event.target.value]); //CONVERT STRING TO NUMBER (INDEX)
    }

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
                return <SemesterViewer semester={eachSemester} key={ind} />;
            })}
        </div>
    );
}
