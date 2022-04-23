import { Course } from "../../../templates/course";
import { ConcentrationCheck } from "../../../templates/ConcentrationCheck";

export function testHPMathRequirements(
    planCourseNames: string[],
    planCourses: Course[]
): ConcentrationCheck {
    const checkResults: ConcentrationCheck = {
        meetsConcentrationRequirements: false,
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

    /** Check if MATH242 is included */
    const checkMATH242 = planCourseNames.includes("math242");
    if (!checkMATH242) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH242 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if MATH243 is included */
    const checkMATH243 = planCourseNames.includes("math243");
    if (!checkMATH243) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH243 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if MATH351 is included */
    const checkMATH351 = planCourseNames.includes("math351");
    if (!checkMATH351) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH351 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if MATH428 is included */
    const checkMATH428 = planCourseNames.includes("math428");
    if (!checkMATH428) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH428 not in plan"
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

    /** Check if Applied Math Track requirement is met */
    let totalTrackReq = 0;
    planCourses.map((course: Course) => {
        if (
            course.courseId.toLowerCase().startsWith("cisc3") ||
            course.courseId.toLowerCase().startsWith("cisc4") ||
            course.courseId.toLowerCase().startsWith("cisc5") ||
            course.courseId.toLowerCase().startsWith("cisc6") ||
            course.courseId.toLowerCase().startsWith("cisc7") ||
            course.courseId.toLowerCase().startsWith("cisc8") ||
            course.courseId.toLowerCase().startsWith("cisc9") ||
            course.courseId.toLowerCase() === "math205" ||
            course.courseId.toLowerCase() === "math350"
        ) {
            totalTrackReq += course.credithours;
        }
    });
    const checkTrackReq = totalTrackReq >= 5;
    if (!checkTrackReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Applied Math Track Electives not satisfied, 5 expected " +
                totalTrackReq +
                " found"
        );
    }

    return checkResults;
}
