import { Course } from "../../../templates/course";
import { ConcentrationCheck } from "../../../templates/ConcentrationCheck";

export function testAIRequirements(
    planCourseNames: string[],
    planCourses: Course[]
): ConcentrationCheck {
    const checkResults: ConcentrationCheck = {
        meetsConcentrationRequirements: false,
        errorMessages: []
    };

    /** Check if CISC304 is included */
    const checkCISC304 = planCourseNames.includes("cisc304");
    if (!checkCISC304) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC304 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CISC442 is included */
    const checkCISC442 = planCourseNames.includes("cisc442");
    if (!checkCISC442) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC442 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CISC481 is included */
    const checkCISC481 = planCourseNames.includes("cisc481");
    if (!checkCISC481) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC481 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CISC483 is included */
    const checkCISC483 = planCourseNames.includes("cisc483");
    if (!checkCISC483) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC483 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CISC484 is included */
    const checkCISC484 = planCourseNames.includes("cisc484");
    if (!checkCISC484) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC484 not in plan"
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

    /** Check if Systems requirement is met */
    const checkSystemsReq =
        planCourseNames.includes("cisc361") ||
        planCourseNames.includes("cisc372");
    if (!checkSystemsReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Systems requirement not met (CISC361 or CISC372)"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Restricted Elective requirement is met */
    let totalRestCreditCount = 0;
    planCourses.map((course: Course) => {
        if (
            course.courseId.toLowerCase() === "cisc436" ||
            course.courseId.toLowerCase() === "cisc437" ||
            course.courseId.toLowerCase() === "cisc489" ||
            course.courseId.toLowerCase() === "cisc889" ||
            course.courseId.toLowerCase() === "educ462" ||
            course.courseId.toLowerCase() === "eleg404" ||
            course.courseId.toLowerCase() === "eleg418" ||
            course.courseId.toLowerCase() === "eleg387" ||
            course.courseId.toLowerCase() === "eleg487" ||
            course.courseId.toLowerCase() === "ling202" ||
            course.courseId.toLowerCase() === "ling404" ||
            course.courseId.toLowerCase() === "ling418" ||
            course.courseId.toLowerCase() === "ling444" ||
            course.courseId.toLowerCase() === "ling451" ||
            course.courseId.toLowerCase() === "ling455" ||
            course.courseId.toLowerCase() === "mast632" ||
            course.courseId.toLowerCase() === "math242" ||
            course.courseId.toLowerCase() === "math349" ||
            course.courseId.toLowerCase() === "meeg671" ||
            course.courseId.toLowerCase() === "psyc310" ||
            course.courseId.toLowerCase() === "psyc340" ||
            course.courseId.toLowerCase() === "psyc344"
        ) {
            totalRestCreditCount += course.credithours;
        }
    });

    const checkRestReq = totalRestCreditCount >= 12;
    if (!checkRestReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Fewer than 12 restricted elective credits in plan, " +
                totalRestCreditCount +
                " found"
        );
    }

    /** Check if Restricted Elective requirement is met */
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
