import { Course } from "../../../templates/course";
import { ConcentrationCheck } from "../../../templates/ConcentrationCheck";

export function testBioinformaticsRequirements(
    planCourseNames: string[],
    planCourses: Course[]
): ConcentrationCheck {
    const checkResults: ConcentrationCheck = {
        meetsConcentrationRequirements: true,
        errorMessages: []
    };

    /** Check if BISC207 is included */
    const checkBISC207 = planCourseNames.includes("bisc207");
    if (!checkBISC207) {
        checkResults.errorMessages.push(
            "Concentration Requirement: BISC207 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if BISC208 is included */
    const checkBISC208 = planCourseNames.includes("bisc208");
    if (!checkBISC208) {
        checkResults.errorMessages.push(
            "Concentration Requirement: BISC208 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if BISC401 is included */
    const checkBISC401 = planCourseNames.includes("bisc401");
    if (!checkBISC401) {
        checkResults.errorMessages.push(
            "Concentration Requirement: BISC401 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CHEM103 is included */
    const checkCHEM103 = planCourseNames.includes("chem103");
    if (!checkCHEM103) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CHEM103 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CHEM133 is included */
    const checkCHEM133 = planCourseNames.includes("chem133");
    if (!checkCHEM133) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CHEM133 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CHEM104 is included */
    const checkCHEM104 = planCourseNames.includes("chem104");
    if (!checkCHEM104) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CHEM104 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if CHEM134 is included */
    const checkCHEM134 = planCourseNames.includes("chem134");
    if (!checkCHEM134) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CHEM134 not in plan"
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

    /** Check if CISC436 is included */
    const checkCISC436 = planCourseNames.includes("cisc436");
    if (!checkCISC436) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC436 not in plan"
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

    /** Check if Organic Chemistry requirement is met */
    const checkOrgChemReq =
        (planCourseNames.includes("chem213") &&
            planCourseNames.includes("chem215")) ||
        (planCourseNames.includes("chem321") &&
            planCourseNames.includes("chem325"));
    if (!checkOrgChemReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Organic Chemistry requirement not met (CHEM213/215 or CHEM321/325)"
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

    /** Check if Data Analysis requirement is met */
    const checkSystemsReq =
        planCourseNames.includes("cisc483") ||
        planCourseNames.includes("cisc484");
    if (!checkSystemsReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Data Analysis requirement not met (CISC361 or CISC372)"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Restricted Elective requirement is met */
    let totalRestCreditCount = 0;
    planCourses.map((course: Course) => {
        if (
            course.courseId.toLowerCase() === "anfs300" ||
            course.courseId.toLowerCase() === "anfs310" ||
            course.courseId.toLowerCase() === "anfs470" ||
            course.courseId.toLowerCase() === "bisc403" ||
            course.courseId.toLowerCase() === "bisc484" ||
            course.courseId.toLowerCase() === "bisc492" ||
            course.courseId.toLowerCase() === "chem214" ||
            course.courseId.toLowerCase() === "chem322" ||
            course.courseId.toLowerCase() === "chem326" ||
            course.courseId.toLowerCase() === "math243" ||
            course.courseId.toLowerCase().startsWith("cisc3") ||
            course.courseId.toLowerCase().startsWith("cisc4") ||
            course.courseId.toLowerCase().startsWith("cisc5") ||
            course.courseId.toLowerCase().startsWith("cisc6") ||
            course.courseId.toLowerCase().startsWith("cisc7") ||
            course.courseId.toLowerCase().startsWith("cisc8") ||
            course.courseId.toLowerCase().startsWith("cisc9")
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

    return checkResults;
}
