import { Course } from "../../../templates/course";
import { ConcentrationCheck } from "../../../templates/ConcentrationCheck";

export function testTheoryDiscreteRequirements(
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

    /** Check if CISC401 is included */
    const checkCISC401 = planCourseNames.includes("cisc401");
    if (!checkCISC401) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC401 not in plan"
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

    /** Check if MATH349 is included */
    const checkMATH349 = planCourseNames.includes("math349");
    if (!checkMATH349) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH349 not in plan"
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

    /** Check if CISC404 is included */
    const checkCISC404 = planCourseNames.includes("cisc404");
    if (!checkCISC404) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC404 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if MATH245 is included */
    const checkMATH245 = planCourseNames.includes("math245");
    if (!checkMATH245) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH245 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if MATH315 is included */
    const checkMATH315 = planCourseNames.includes("math315");
    if (!checkMATH315) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH315 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if MATH451 is included */
    const checkMATH451 = planCourseNames.includes("math451");
    if (!checkMATH451) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH451 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Restricted Elective requirement is met */
    let totalRestCreditCount = 0;
    planCourses.map((course: Course) => {
        if (
            course.courseId.toLowerCase() === "cisc372" ||
            course.courseId.toLowerCase() === "cisc404" ||
            course.courseId.toLowerCase() === "cisc410" ||
            course.courseId.toLowerCase() === "cisc414" ||
            course.courseId.toLowerCase() === "cisc471" ||
            course.courseId.toLowerCase() === "cisc481" ||
            course.courseId.toLowerCase() === "eleg387" ||
            course.courseId.toLowerCase() === "eleg487" ||
            course.courseId.toLowerCase() === "math243" ||
            course.courseId.toLowerCase() === "math245" ||
            course.courseId.toLowerCase() === "math302" ||
            course.courseId.toLowerCase() === "math315" ||
            course.courseId.toLowerCase() === "math350" ||
            course.courseId.toLowerCase() === "math428" ||
            course.courseId.toLowerCase() === "math450" ||
            course.courseId.toLowerCase() === "math451"
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
