import React from "react";
import { Course } from "../../templates/course";
import { Semester } from "../../templates/semester";
import { Plan } from "../../templates/plan";
import { ConcentrationCheck } from "../../templates/ConcentrationCheck";
import { testAIRequirements } from "./concentration-testers/ArtificialIntelligenceTester";
import { testBioinformaticsRequirements } from "./concentration-testers/BioinformaticsTester";
import { testCyberRequirements } from "./concentration-testers/CybersecurityTester";
import { testDataScienceRequirements } from "./concentration-testers/DataScienceTester";
import { testHPMathRequirements } from "./concentration-testers/HighPerformanceMathTester";
import { testHPDataRequirements } from "./concentration-testers/HighPerformanceDataTester";
import { testSystemNetworkRequirements } from "./concentration-testers/SystemsNetworkTester";

export function checkPlan(plan: Plan, concentration: string): JSX.Element {
    const planCourseNames: string[] = [];
    const planCourses: Course[] = [];
    let creditCount = 0;

    /** Create an array of Course objects, as well as their courseIDs
     *  and update the creditCount field
     */
    plan.semesters.map((semester: Semester) => {
        semester.courses.map((course: Course) => {
            planCourseNames.push(course.courseId.toLowerCase());
            planCourses.push(course);
            creditCount = creditCount + course.credithours;
        });
    });

    /** Check to make sure core prerequisites are being met */
    const seenCourse: string[] = [];
    const prereqFailCourses: string[] = [];
    planCourses.map((course: Course) => {
        seenCourse.push(course.courseId);
        course.prereqs.map((prerequisite: string) => {
            if (!seenCourse.includes(prerequisite) && prerequisite !== "None") {
                prereqFailCourses.push(course.courseId);
            }
        });
    });

    /** Check to see if English requirement is fulfilled */
    const englCourses = planCourses.filter((course: Course) =>
        course.satisfied_requirements.includes("sem")
    );
    const checkSEM = englCourses.length > 0;

    /** Check to see if there are any courses that satisfy the multicultural requirement */
    const multiCourses = planCourses.filter((course: Course) =>
        course.satisfied_requirements.includes("mul")
    );
    const checkMulticultural = multiCourses.length > 0;

    /** Check to see if the capstone requirement is met */
    const capstoneCourses: string[] = [];
    planCourses.map((course: Course) => {
        if (course.satisfied_requirements.includes("cap")) {
            capstoneCourses.push(course.courseId);
        }
    });
    const checkCapstone =
        (capstoneCourses.includes("cisc498") &&
            capstoneCourses.includes("cisc499")) ||
        (capstoneCourses.includes("univ401") &&
            capstoneCourses.includes("univ402"));

    /** Check to see if the discovery learning experience requirement is met */
    let dleCredits = 0;
    planCourses.map((course: Course) => {
        if (course.satisfied_requirements.includes("dle")) {
            dleCredits += course.credithours;
        }
    });
    const checkDLE = dleCredits >= 3;

    /** Check to see if the creative arts and humanities requirement is met */
    let cahCredits = 0;
    planCourses.map((course: Course) => {
        if (course.satisfied_requirements.includes("cah")) {
            cahCredits += course.credithours;
        }
    });
    const checkCAH = cahCredits >= 3;

    /** Check to see if the history and cultural change requirement is met */
    let hccCredits = 0;
    planCourses.map((course: Course) => {
        if (course.satisfied_requirements.includes("hcc")) {
            hccCredits += course.credithours;
        }
    });
    const checkHCC = hccCredits >= 3;

    /** Check to see if the social and behaviroal science requirement is met */
    let sbsCredits = 0;
    planCourses.map((course: Course) => {
        if (course.satisfied_requirements.includes("sbs")) {
            sbsCredits += course.credithours;
        }
    });
    const checkSBS = sbsCredits >= 3;

    /** Check to see if the math, natural science, and tech requirement is met */
    let mntCredits = 0;
    planCourses.map((course: Course) => {
        if (course.satisfied_requirements.includes("mnt")) {
            mntCredits += course.credithours;
        }
    });
    const checkMNT = mntCredits >= 3;

    /** Check to see if the Lab Science requirement is met */
    const checkLabScience =
        (planCourseNames.includes("bisc207") &&
            planCourseNames.includes("bisc208")) ||
        (planCourseNames.includes("chem103") &&
            planCourseNames.includes("chem133") &&
            planCourseNames.includes("chem104") &&
            planCourseNames.includes("chem134")) ||
        (planCourseNames.includes("geol105") &&
            planCourseNames.includes("geol115") &&
            planCourseNames.includes("geol107")) ||
        (planCourseNames.includes("geol107") &&
            planCourseNames.includes("geol110")) ||
        (planCourseNames.includes("phys207") &&
            planCourseNames.includes("phys227") &&
            planCourseNames.includes("phys208") &&
            planCourseNames.includes("phys228"));

    /** Check to see if the College of Engineering regular breadth requirement is met */
    /**NOTE THIS NEEDS TO CHECK AND MAKE SURE YOU'RE NOT DOUBLEDIPPING CLASSES */
    const checkLOWER =
        cahCredits + hccCredits + sbsCredits >= 18 &&
        checkCAH &&
        checkHCC &&
        checkSBS;

    /** Check to see if the College of Engineering Upper Level Breadth requirement is met */
    let uppCredits = 0;
    planCourses.map((course: Course) => {
        if (course.satisfied_requirements.includes("upp")) {
            uppCredits += course.credithours;
        }
    });
    const checkUPP = uppCredits >= 6;

    /** Check to see if the course list meets the tech writing requirement */
    const checkTWR =
        planCourseNames.includes("engl312") ||
        planCourseNames.includes("engl410");

    /** Check to see if the course contains all the required CISC courses */
    const checkCORE =
        planCourseNames.includes("cisc108") &&
        planCourseNames.includes("cisc181") &&
        planCourseNames.includes("cisc210") &&
        planCourseNames.includes("cisc220") &&
        planCourseNames.includes("cisc260") &&
        planCourseNames.includes("cisc275") &&
        planCourseNames.includes("cisc303") &&
        planCourseNames.includes("cisc320") &&
        planCourseNames.includes("cisc355") &&
        planCourseNames.includes("math205") &&
        planCourseNames.includes("math210");

    /** Checks to see if all the requirements pass */
    const isValid =
        creditCount > 124 &&
        checkSEM &&
        checkMulticultural &&
        checkCapstone &&
        checkDLE &&
        checkCAH &&
        checkHCC &&
        checkSBS &&
        checkMNT &&
        checkLabScience &&
        checkLOWER &&
        checkUPP &&
        checkTWR &&
        checkCORE;

    /** Check to see if the concentrationr requirements are being met */
    let concentrationResults: ConcentrationCheck;

    if (concentration === "Artificial Intelligence") {
        concentrationResults = testAIRequirements(planCourseNames, planCourses);
    } else if (concentration === "Bioinformatics") {
        concentrationResults = testBioinformaticsRequirements(
            planCourseNames,
            planCourses
        );
    } else if (concentration === "Cybersecurity") {
        concentrationResults = testCyberRequirements(
            planCourseNames,
            planCourses
        );
    } else if (concentration === "Data Science") {
        concentrationResults = testDataScienceRequirements(
            planCourseNames,
            planCourses
        );
    } else if (concentration === "High Performance Computing (Data Track)") {
        concentrationResults = testHPDataRequirements(
            planCourseNames,
            planCourses
        );
    } else if (concentration === "High Performance Computing (Math Track)") {
        concentrationResults = testHPMathRequirements(
            planCourseNames,
            planCourses
        );
    } else if (concentration === "Systems and Networking") {
        concentrationResults = testSystemNetworkRequirements(
            planCourseNames,
            planCourses
        );
    } else {
        concentrationResults = {
            meetsConcentrationRequirements: true,
            errorMessages: ["Fatal Error: Invalid Concentration Selected"]
        };
    }

    return (
        <div>
            <hr></hr>
            {isValid && (
                <div
                    style={{
                        borderRadius: "5px",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        marginLeft: "20px",
                        marginRight: "20px",
                        textAlign: "left",
                        backgroundColor: "#77DD77",
                        borderColor: "green"
                    }}
                >
                    <div
                        style={{
                            marginLeft: "10px",
                            marginRight: "10px"
                        }}
                    >
                        <h4 style={{ marginBottom: "0px" }}>
                            <strong>Looks good!</strong>
                        </h4>
                        <strong>
                            This plan meets all university requirements
                        </strong>
                    </div>
                </div>
            )}
            {!isValid && (
                <div
                    style={{
                        borderRadius: "5px",
                        borderWidth: "2px",
                        borderStyle: "solid",
                        textAlign: "left",
                        backgroundColor: "#FAA0A0",
                        borderColor: "darkred"
                    }}
                >
                    <div
                        style={{
                            marginLeft: "10px",
                            marginRight: "10px"
                        }}
                    >
                        <h4 style={{ marginBottom: "0px" }}>
                            <strong>There are problems with this plan</strong>
                        </h4>
                        <strong>
                            Please correct the following issues: {concentration}
                        </strong>
                        <ul>
                            {creditCount < 124 && (
                                <li>Fewer than 124 credit hours in plan</li>
                            )}
                            {!checkSEM && (
                                <li>
                                    First Year Writing Seminar requirement not
                                    fulfilled
                                </li>
                            )}
                            {!checkCapstone && (
                                <li>
                                    Capstone series not included (CISC498/499 or
                                    UNIV401/402)
                                </li>
                            )}
                            {!checkDLE && (
                                <li>
                                    Discovery Learning Experience requirement
                                    not fulfilled
                                </li>
                            )}
                            {!checkMulticultural && (
                                <li>
                                    University Multicultural breadth requirement
                                    not fulfilled
                                </li>
                            )}
                            {!checkCAH && (
                                <li>
                                    University Creative Arts and Humanities
                                    breadth requirement not fulfilled
                                </li>
                            )}
                            {!checkHCC && (
                                <li>
                                    University History and Cultural Change
                                    breadth requirement not fulfilled
                                </li>
                            )}
                            {!checkSBS && (
                                <li>
                                    University Social and Behavioral Sciences
                                    breadth requirement not fulfilled
                                </li>
                            )}
                            {!checkMNT && (
                                <li>
                                    University Math, Natural Science, and
                                    Technology breadth requirement not fulfilled
                                </li>
                            )}
                            {!checkLabScience && (
                                <li>Lab Science series not included</li>
                            )}
                            {!checkLOWER && (
                                <li>
                                    College of Engineering non-upper level
                                    breadth requirement not fulfilled
                                </li>
                            )}
                            {!checkUPP && (
                                <li>
                                    College of Engineering upper level breadth
                                    requirement not fulfilled
                                </li>
                            )}
                            {!checkTWR && (
                                <li>
                                    Technical writing requirement not fulfilled
                                </li>
                            )}
                            {!checkCORE && (
                                <li>
                                    Computer Science core requirements not
                                    fulfilled
                                </li>
                            )}
                            {prereqFailCourses.length > 0 && (
                                <li>
                                    {
                                        "The following courses have not had all their prerequirements met:"
                                    }

                                    <ul>
                                        {prereqFailCourses.map(
                                            (course: string) => (
                                                <li
                                                    key={`prereq-fail-${course}`}
                                                >
                                                    {course}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </li>
                            )}
                            {concentrationResults.errorMessages.map(
                                (error: string) => (
                                    <li key={`concentration-fail-${error}`}>
                                        {error}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
