import { Course } from "../../../templates/course";
import { ConcentrationCheck } from "../../../templates/ConcentrationCheck";

export function testHPDataRequirements(
    planCourseNames: string[],
    planCourses: Course[]
): ConcentrationCheck {
    const checkResults: ConcentrationCheck = {
        meetsConcentrationRequirements: true,
        errorMessages: []
    };

    /** Check if CISC437 is included */
    const checkCISC437 = planCourseNames.includes("cisc437");
    if (!checkCISC437) {
        checkResults.errorMessages.push(
            "Concentration Requirement: CISC437 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if MATH350 is included */
    const checkMATH350 = planCourseNames.includes("math350");
    if (!checkMATH350) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH350 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if MATH450 is included */
    const checkMATH450 = planCourseNames.includes("math450");
    if (!checkMATH450) {
        checkResults.errorMessages.push(
            "Concentration Requirement: MATH450 not in plan"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Machine Learning requirement is met */
    const checkMLReq =
        planCourseNames.includes("cisc483") ||
        planCourseNames.includes("cisc484");
    if (!checkMLReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Machine Learning requirement not met (CISC483 or CISC484)"
        );
        checkResults.meetsConcentrationRequirements = false;
    }

    /** Check if Data Track requirement is met */
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
            course.courseId.toLowerCase() === "math302" ||
            course.courseId.toLowerCase() === "math349" ||
            course.courseId.toLowerCase() === "math351" ||
            course.courseId.toLowerCase() === "math535"
        ) {
            totalTrackReq += course.credithours;
        }
    });
    const checkTrackReq = totalTrackReq >= 5;
    if (!checkTrackReq) {
        checkResults.errorMessages.push(
            "Concentration Requirement: Data Track Electives not satisfied, 5 expected " +
                totalTrackReq +
                " found"
        );
    }

    return checkResults;
}
