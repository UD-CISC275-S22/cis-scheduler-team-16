import { Course } from "../../templates/course";
import { ConcentrationCheck } from "../../templates/ConcentrationCheck";

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
            course.courseId === "cisc436" ||
            course.courseId === "cisc437" ||
            course.courseId === "cisc489" ||
            course.courseId === "cisc889" ||
            course.courseId === "educ462" ||
            course.courseId === "eleg404" ||
            course.courseId === "eleg418" ||
            course.courseId === "eleg387" ||
            course.courseId === "eleg487" ||
            course.courseId === "ling202" ||
            course.courseId === "ling404" ||
            course.courseId === "ling418" ||
            course.courseId === "ling444" ||
            course.courseId === "ling451" ||
            course.courseId === "ling455" ||
            course.courseId === "mast632" ||
            course.courseId === "math242" ||
            course.courseId === "math349" ||
            course.courseId === "meeg671" ||
            course.courseId === "psyc310" ||
            course.courseId === "psyc340" ||
            course.courseId === "psyc344"
        ) {
            totalRestCreditCount += course.credithours;
        }
    });
    const checkRestReq = totalRestCreditCount >= 12;
    if (!checkRestReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Fewer than 12 restricted elective credits in plan, " +
                { totalRestCreditCount } +
                " found"
        );
    }

    return checkResults;
}
