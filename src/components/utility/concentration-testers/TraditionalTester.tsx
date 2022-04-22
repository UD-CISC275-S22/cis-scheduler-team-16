import { Course } from "../../../templates/course";
import { ConcentrationCheck } from "../../../templates/ConcentrationCheck";

export function testTraditionalRequirements(
    planCourseNames: string[],
    planCourses: Course[]
): ConcentrationCheck {
    const checkResults: ConcentrationCheck = {
        meetsConcentrationRequirements: false,
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

    /** Check if Restricted Elective requirement is met */
    let totalRestCreditCount = 0;
    planCourses.map((course: Course) => {
        if (
            course.courseId === "cisc372" ||
            course.courseId === "cisc404" ||
            course.courseId === "cisc410" ||
            course.courseId === "cisc414" ||
            course.courseId === "cisc471" ||
            course.courseId === "cisc481" ||
            course.courseId === "eleg387" ||
            course.courseId === "eleg487" ||
            course.courseId === "math243" ||
            course.courseId === "math245" ||
            course.courseId === "math302" ||
            course.courseId === "math315" ||
            course.courseId === "math350" ||
            course.courseId === "math428" ||
            course.courseId === "math450" ||
            course.courseId === "math451"
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
            (course.courseId.toLowerCase().startsWith("cisc3") ||
                course.courseId.toLowerCase().startsWith("cisc4") ||
                course.courseId.toLowerCase().startsWith("cisc5") ||
                course.courseId.toLowerCase().startsWith("cisc6") ||
                course.courseId.toLowerCase().startsWith("cisc7") ||
                course.courseId.toLowerCase().startsWith("cisc8") ||
                course.courseId.toLowerCase().startsWith("cisc9")) &&
            course.courseId !== "cisc355" &&
            course.courseId !== "cisc356" &&
            course.courseId !== "cisc357" &&
            course.courseId !== "cisc465" &&
            course.courseId !== "cisc366" &&
            course.courseId !== "cisc466"
        ) {
            totalUpperLevelCISC += course.credithours;
        }
    });
    const checkUpperLevelCISC = totalUpperLevelCISC >= 3;
    if (!checkUpperLevelCISC) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Fewer than 3 upper level CISC credits in plan, " +
                totalUpperLevelCISC +
                " found (Excludes CISC355, CISC356, CISC357, CISC465, CISC366, and CISC466)"
        );
    }

    return checkResults;
}
