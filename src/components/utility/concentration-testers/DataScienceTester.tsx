import { Course } from "../../../templates/course";
import { ConcentrationCheck } from "../../../templates/ConcentrationCheck";

export function testDataScienceRequirements(
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

    /** Check if CISC372 is included */
    const checkCISC372 = planCourseNames.includes("cisc372");
    if (!checkCISC372) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC372 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CISC437 is included */
    const checkCISC437 = planCourseNames.includes("cisc437");
    if (!checkCISC437) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC437 not in plan"
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

    /** Check if MATH205 is included */
    const checkMATH205 = planCourseNames.includes("math205");
    if (!checkMATH205) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH205 not in plan"
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

    /** Check if MATH349 is included */
    const checkMATH349 = planCourseNames.includes("math349");
    if (!checkMATH349) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH349 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Advanced Data Science requirement is met */
    const advDataCourses: string[] = [];
    planCourseNames.map((course: string) => {
        if (course === "cisc483" || course === "cisc484") {
            advDataCourses.push(course);
        }
    });
    const checkAdvDataReq = advDataCourses.length >= 1;
    if (!checkAdvDataReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Advanced Data Science requirement not met (CISC483 or CISC484)"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Advanced Math requirement is met */
    const advMathCourses: string[] = [];
    planCourseNames.map((course: string) => {
        if (
            course === "math302" ||
            course === "math350" ||
            course === "math426"
        ) {
            advMathCourses.push(course);
        }
    });
    const checkAdvMathReq = advMathCourses.length >= 1;
    if (!checkAdvMathReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Advanced Math requirement not met (MATH302, MATH350, or MATH426)"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Restricted Elective requirement is met */
    let totalRestCreditCount = 0;
    planCourses.map((course: Course) => {
        if (
            course.courseId.toLowerCase() === "cisc361" ||
            course.courseId.toLowerCase() === "cisc410" ||
            course.courseId.toLowerCase() === "cisc436" ||
            course.courseId.toLowerCase() === "cisc440" ||
            course.courseId.toLowerCase() === "cisc442" ||
            course.courseId.toLowerCase() === "cisc449" ||
            course.courseId.toLowerCase() === "cisc450" ||
            course.courseId.toLowerCase() === "cisc471" ||
            course.courseId.toLowerCase() === "cisc474" ||
            course.courseId.toLowerCase() === "cisc483" ||
            course.courseId.toLowerCase() === "cisc484" ||
            course.courseId.toLowerCase() === "cisc489" ||
            course.courseId.toLowerCase() === "eleg387" ||
            course.courseId.toLowerCase() === "eleg487" ||
            course.courseId.toLowerCase() === "math302" ||
            course.courseId.toLowerCase() === "math350" ||
            course.courseId.toLowerCase() === "math428" ||
            course.courseId.toLowerCase() === "math450"
        ) {
            totalRestCreditCount += course.credithours;
        }
    });
    const checkRestReq = totalRestCreditCount >= 3;
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
