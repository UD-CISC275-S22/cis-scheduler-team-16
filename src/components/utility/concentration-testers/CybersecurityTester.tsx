import { Course } from "../../../templates/course";
import { ConcentrationCheck } from "../../../templates/ConcentrationCheck";

export function testCyberRequirements(
    planCourseNames: string[],
    planCourses: Course[]
): ConcentrationCheck {
    const checkResults: ConcentrationCheck = {
        meetsConcentrationRequirements: true,
        errorMessages: []
    };

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

    /** Check if CISC464 is included */
    const checkCISC464 = planCourseNames.includes("cisc464");
    if (!checkCISC464) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC464 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CPEG465 is included */
    const checkCPEG465 = planCourseNames.includes("cpeg465");
    if (!checkCPEG465) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CPEG465 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CPEG494 is included */
    const checkCPEG494 = planCourseNames.includes("cpeg494");
    if (!checkCPEG494) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CPEG494 not in plan"
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

    /** Check if Advanced Cybersecurity requirement is met */
    const cyberCourses: string[] = [];
    planCourseNames.map((course: string) => {
        if (
            course === "cpeg472" ||
            course === "cpeg473" ||
            course === "cpeg475" ||
            course === "cpeg476" ||
            course === "cpeg495"
        ) {
            cyberCourses.push(course);
        }
    });
    const checkCyberReq = cyberCourses.length >= 2;
    if (!checkCyberReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Advanced Cybersecurity requirement not met"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Restricted Elective requirement is met */
    let totalRestCreditCount = 0;
    planCourses.map((course: Course) => {
        if (
            course.courseId.toLowerCase() === "math242" ||
            course.courseId.toLowerCase() === "math349" ||
            course.courseId.toLowerCase() === "math549" ||
            course.courseId.toLowerCase() === "cisc304" ||
            course.courseId.toLowerCase() === "cisc436" ||
            course.courseId.toLowerCase() === "cisc437" ||
            course.courseId.toLowerCase() === "cisc440" ||
            course.courseId.toLowerCase() === "cisc442" ||
            course.courseId.toLowerCase() === "cisc449" ||
            course.courseId.toLowerCase() === "cisc453" ||
            course.courseId.toLowerCase() === "cisc459" ||
            course.courseId.toLowerCase() === "cisc481" ||
            course.courseId.toLowerCase() === "cisc483" ||
            course.courseId.toLowerCase() === "cisc484" ||
            course.courseId.toLowerCase() === "cisc474" ||
            course.courseId.toLowerCase() === "cpeg470" ||
            course.courseId.toLowerCase() === "cpeg471" ||
            course.courseId.toLowerCase() === "cpeg472" ||
            course.courseId.toLowerCase() === "cpeg473" ||
            course.courseId.toLowerCase() === "cpeg474" ||
            course.courseId.toLowerCase() === "cpeg475" ||
            course.courseId.toLowerCase() === "cpeg476" ||
            course.courseId.toLowerCase() === "cpeg494" ||
            course.courseId.toLowerCase() === "cpeg495" ||
            course.courseId.toLowerCase() === "eleg387" ||
            course.courseId.toLowerCase() === "eleg487"
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
