import { Course } from "../../../templates/course";
import { ConcentrationCheck } from "../../../templates/ConcentrationCheck";

export function testSystemNetworkRequirements(
    planCourseNames: string[],
    planCourses: Course[]
): ConcentrationCheck {
    const checkResults: ConcentrationCheck = {
        meetsConcentrationRequirements: true,
        errorMessages: []
    };

    /** Check if CISC360 is included */
    const checkCISC360 = planCourseNames.includes("cisc360");
    if (!checkCISC360) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC360 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CISC361 is included */
    const checkCISC361 = planCourseNames.includes("cisc361");
    if (!checkCISC361) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC361 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CISC372 is included */
    const checkCISC372 = planCourseNames.includes("cisc372");
    if (!checkCISC372) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC372 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CISC450 is included */
    const checkCISC450 = planCourseNames.includes("cisc450");
    if (!checkCISC450) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC450 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CISC471 is included */
    const checkCISC471 = planCourseNames.includes("cisc471");
    if (!checkCISC471) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC471 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Probability/Statistics requirement is met */
    const checkProbReq =
        planCourseNames.includes("math205") ||
        planCourseNames.includes("math350");
    if (!checkProbReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Probability/Statistics requirement not met (MATH205 or MATH350)"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Security requirement is met */
    const securityCourses: string[] = [];
    planCourseNames.map((course: string) => {
        if (
            course === "cisc464" ||
            course === "cpeg465" ||
            course === "cpeg470" ||
            course === "cpeg476" ||
            course === "cpeg473" ||
            course === "cpeg475" ||
            course === "cpeg497"
        ) {
            securityCourses.push(course);
        }
    });
    const checkSecurityReq = securityCourses.length >= 1;
    if (!checkSecurityReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Security requirement not met"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Advanced Systems requirement is met */
    const advSystemsCourses: string[] = [];
    planCourseNames.map((course: string) => {
        if (
            course === "cisc437" ||
            course === "cisc453" ||
            course === "cisc459" ||
            course === "cisc464" ||
            course === "cisc474" ||
            course === "cisc475" ||
            course === "cisc479" ||
            course === "cpeg473" ||
            course === "cpeg497"
        ) {
            advSystemsCourses.push(course);
        }
    });
    const advSystemsReq = advSystemsCourses.length >= 2;
    if (!advSystemsReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Advanced Systems requirement not met"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Restricted Elective requirement is met */
    let totalRestCreditCount = 0;
    planCourses.map((course: Course) => {
        if (
            course.courseId.toLowerCase() === "cisc304" ||
            course.courseId.toLowerCase() === "cisc436" ||
            course.courseId.toLowerCase() === "cisc437" ||
            course.courseId.toLowerCase() === "cisc440" ||
            course.courseId.toLowerCase() === "cisc442" ||
            course.courseId.toLowerCase() === "cisc449" ||
            course.courseId.toLowerCase() === "cisc453" ||
            course.courseId.toLowerCase() === "cisc459" ||
            course.courseId.toLowerCase() === "cisc464" ||
            course.courseId.toLowerCase() === "cisc474" ||
            course.courseId.toLowerCase() === "cisc475" ||
            course.courseId.toLowerCase() === "cisc479" ||
            course.courseId.toLowerCase() === "cisc481" ||
            course.courseId.toLowerCase() === "cisc483" ||
            course.courseId.toLowerCase() === "cisc484" ||
            course.courseId.toLowerCase() === "cisc489" ||
            course.courseId.toLowerCase() === "cpeg202" ||
            course.courseId.toLowerCase() === "cpeg222" ||
            course.courseId.toLowerCase() === "cpeg323" ||
            course.courseId.toLowerCase() === "cpeg422" ||
            course.courseId.toLowerCase() === "cpeg460" ||
            course.courseId.toLowerCase() === "cpeg465" ||
            course.courseId.toLowerCase() === "cpeg470" ||
            course.courseId.toLowerCase() === "cpeg475" ||
            course.courseId.toLowerCase() === "cpeg476" ||
            course.courseId.toLowerCase() === "cpeg494" ||
            course.courseId.toLowerCase() === "cpeg497" ||
            course.courseId.toLowerCase() === "eleg387" ||
            course.courseId.toLowerCase() === "eleg487" ||
            course.courseId.toLowerCase() === "math242" ||
            course.courseId.toLowerCase() === "math349"
        ) {
            totalRestCreditCount += course.credithours;
        }
    });
    const checkRestReq = totalRestCreditCount >= 6;
    if (!checkRestReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Fewer than 6 restricted elective credits in plan, " +
                totalRestCreditCount +
                " found"
        );
    }

    /** Check if Upper Level CISC requirement is met */
    let totalUpperLevelCISC = 0;
    planCourses.map((course: Course) => {
        if (
            course.courseId.toLowerCase().startsWith("cisc3") ||
            course.courseId.toLowerCase().startsWith("cisc4") ||
            course.courseId.toLowerCase().startsWith("cisc5") ||
            course.courseId.toLowerCase().startsWith("cisc6") ||
            course.courseId.toLowerCase().startsWith("cisc7") ||
            course.courseId.toLowerCase().startsWith("cisc8") ||
            course.courseId.toLowerCase().startsWith("cisc9")
        ) {
            totalUpperLevelCISC += course.credithours;
        }
    });
    const checkUpperLevelCISC = totalUpperLevelCISC >= 3;
    if (!checkUpperLevelCISC) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Fewer than 3 upper level CISC credits in plan, " +
                totalUpperLevelCISC +
                " found"
        );
    }

    return checkResults;
}
