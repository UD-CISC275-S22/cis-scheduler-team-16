import { Course } from "../../templates/course";
import { Semester } from "../../templates/semester";
import { Plan } from "../../templates/plan";

type COURSE_OPERATIONS =
    | "add"
    | "addFromPool"
    | "update"
    | "delete"
    | "clear"
    | "moveup"
    | "movedown"
    | "moveCourseToSemester"
    | "addSemester"
    | "deleteSemester"
    | "addPlan"
    | "deletePlan";

/**
 * This is a function to update the course in the semester, called in SemesterViewer
 * @param course The course to update in the semester
 * @param semseterIndex Which semester to update
 * @param courseIndex Which course to delete/update
 * @param type What operation we're doing
 */
export function updateSemesterCourse({
    curPlan,
    setCurPlan,
    course,
    semesterIndex,
    semesterInputID,
    courseIndex,
    opType,
    year,
    term,
    allPlans,
    setAllPlans,
    planSetter,
    setShowMessage,
    setModalHeader,
    setModalMessage,
    editSem,
    setEditSem
}: {
    curPlan: Plan;
    setCurPlan: (plan: Plan) => void;
    course?: Course;
    semesterIndex: number;
    semesterInputID?: string;
    courseIndex?: number;
    opType: COURSE_OPERATIONS;
    year?: number;
    term?: string;
    allPlans?: Plan[];
    setAllPlans?: (plan: Plan[]) => void;
    planSetter: (semesterIndex: number, semester: Semester) => void;
    setShowMessage: (bool: boolean) => void;
    setModalHeader: (header: string) => void;
    setModalMessage: (message: string) => void;
    editSem?: boolean;
    setEditSem?: (bool: boolean) => void;
}) {
    const semester = curPlan.semesters[semesterIndex];
    const clonedPlan = { ...curPlan };

    const semesterAdder = (semester: Semester): void => {
        if (setEditSem != undefined && editSem != undefined) {
            const planSemesters = [...curPlan.semesters].map((e) => {
                return { ...e, courses: [...e.courses] };
            });
            planSemesters.splice(planSemesters.length, 0, semester);
            setCurPlan({ ...curPlan, semesters: planSemesters });
            setEditSem(!editSem); //added to close semester edit when saved
        }
    };

    const planAdder = (newPlan: Plan): void => {
        if (allPlans != undefined && setAllPlans != undefined) {
            const newPlans = [...allPlans];
            newPlans.splice(allPlans.length, 0, newPlan);
            setAllPlans(newPlans);
            console.log("Add Plan: ", newPlans);
            console.log("Add Plan: ", allPlans);
        }
    };

    const semesterDeleter = (index: number): void => {
        if (curPlan.semesters.length > 0) {
            curPlan.semesters.splice(index, 1);
            const planSemesters = [...curPlan.semesters].map(
                (e, ind: number) => {
                    return {
                        ...e,
                        semesterId: ind,
                        courses: [...e.courses]
                    };
                }
            );
            planSemesters.splice(planSemesters.length, 1);
            setCurPlan({
                ...curPlan,
                semesters: planSemesters
            });
        }
    };

    const planDeleter = (): void => {
        if (allPlans != undefined && setAllPlans != undefined) {
            if (allPlans.length > 0) {
                const newPlans = [...allPlans];
                console.log("newPlans Before", allPlans);
                newPlans.splice(parseInt(curPlan.id), 1);
                console.log("newPlans After", newPlans);
                setCurPlan(newPlans[0]);
                setAllPlans(newPlans);
            }
        }
    };

    switch (opType) {
        case "add": {
            // add course
            setShowMessage(true);
            setModalHeader("Lets Go!");
            setModalMessage(
                `A new Blank Course ("COUR0${
                    semester.courses.length + 1
                }": Introduction to Planning) has been added!`
            );
            if (course) {
                semester.courses = [
                    ...semester.courses,
                    {
                        ...course,
                        courseId: "COUR0" + `${semester.courses.length + 1}`
                    }
                ];
            }
            planSetter(semesterIndex, semester);
            break;
        }
        case "addFromPool": {
            // add course
            if (course) {
                semester.courses = [
                    ...semester.courses,
                    {
                        ...course
                    }
                ];
            }
            planSetter(semesterIndex, semester);
            break;
        }
        case "delete": {
            // delete course
            setShowMessage(true);
            setModalHeader("Deletion");
            setModalMessage("Removed course from semester.");
            if (courseIndex !== undefined) {
                semester.courses.splice(courseIndex, 1);
            }
            planSetter(semesterIndex, semester);
            break;
        }
        case "update": {
            // update course
            semester.courses = [...semester.courses].map(
                (e: Course, ind: number) => {
                    if (ind === courseIndex) {
                        return course ?? e;
                    } else {
                        return e;
                    }
                }
            );
            planSetter(semesterIndex, semester);
            break;
        }
        case "clear": {
            setShowMessage(true);
            setModalHeader("Deletion");
            setModalMessage("All courses have been cleared for this semester");
            semester.courses = [];
            planSetter(semesterIndex, semester);
            break;
        }
        case "moveup": {
            if (courseIndex != undefined && courseIndex > 0) {
                const tmpCourse = semester.courses[courseIndex];
                semester.courses[courseIndex] =
                    semester.courses[courseIndex - 1];
                semester.courses[courseIndex - 1] = tmpCourse;
            } else {
                setShowMessage(true);
                setModalHeader("For your information");
                setModalMessage(
                    "Could not move the course up further, as it is the first course in the semester"
                );
            }
            planSetter(semesterIndex, semester);
            break;
        }
        case "movedown": {
            if (
                courseIndex != undefined &&
                courseIndex < semester.courses.length - 1
            ) {
                const tmpCourse = semester.courses[courseIndex];
                semester.courses[courseIndex] =
                    semester.courses[courseIndex + 1];
                semester.courses[courseIndex + 1] = tmpCourse;
            } else {
                setShowMessage(true);
                setModalHeader("For your information");
                setModalMessage(
                    "Could not move the course down further, as it is the last course in the semester"
                );
            }
            planSetter(semesterIndex, semester);
            break;
        }
        case "moveCourseToSemester": {
            if (
                courseIndex !== undefined &&
                semesterInputID !== undefined &&
                course &&
                semesterInputID != ""
            ) {
                const semesterFound = curPlan.semesters.find(
                    (s) => s.term + " " + s.year === semesterInputID
                );
                if (semesterFound != undefined) {
                    setShowMessage(true);
                    setModalHeader("Lets Go!");
                    setModalMessage(
                        `${course.courseId} has been moved to ${
                            semesterFound.term + " " + semesterFound.year
                        }`
                    );
                }

                if (semesterFound !== undefined) {
                    curPlan.semesters.map((s: Semester) => {
                        if (s.term + " " + s.year === semesterInputID) {
                            console.log(
                                "semester term and year",
                                semester.term + " " + semester.year
                            );
                            const moveCourse = semester.courses.splice(
                                courseIndex,
                                1
                            );
                            s.courses = [...s.courses, moveCourse[0]];
                        }
                    });
                } else {
                    setShowMessage(true);
                    setModalHeader("Uh-oh");
                    setModalMessage(
                        `Could not find a semester matching "${semesterInputID}"`
                    );
                }
            }
            planSetter(semesterIndex, semester);
            break;
        }
        case "addSemester": {
            // add course
            //console.log("Assembly Guy");

            if (
                semesterAdder != undefined &&
                year != undefined &&
                term != undefined
            ) {
                const newSemester = {
                    term: term, //changed from "Blank Semester"
                    courses: [],
                    year: year, //changed from "3"
                    id: `${clonedPlan.semesters.length}`
                };
                const semesterDuplicateFound = curPlan.semesters.find(
                    (s) =>
                        s.term + " " + s.year ===
                        newSemester.term + " " + newSemester.year
                );
                //console.log("newSem length: ", newSemesters.length);
                if (semesterDuplicateFound === undefined) {
                    setShowMessage(true);
                    setModalHeader("Lets Go!");
                    setModalMessage(
                        `${term + " " + year} has been added to the Plan!`
                    );
                    semesterAdder(newSemester);
                } else {
                    setModalMessage(
                        "Looks like your're adding a Semester that already exists!"
                    );
                    setModalHeader("Uh-Oh!");
                    setShowMessage(true);
                }
            }
            break;
        }
        case "deleteSemester": {
            // delete course
            if (semesterIndex !== undefined && semesterDeleter != undefined) {
                setShowMessage(true);
                setModalHeader("Deletion");
                setModalMessage("The semester has been deleted!");
                console.log("semesterIndex: ", semesterIndex);
                semesterDeleter(semesterIndex);
            }
            break;
        }
        default: {
            break;
        }
        case "addPlan": {
            // add course
            if (allPlans != undefined) {
                setShowMessage(true);
                setModalHeader("Lets Go!");
                setModalMessage("A New plan has been added!");
                const newPlan = {
                    name:
                        "My Plan " +
                        `${parseInt(allPlans[allPlans.length - 1].id) + 2}`,
                    semesters: [],
                    id: `${allPlans.length}`
                };
                //console.log("newSem length: ", newSemesters.length);
                if (planAdder != undefined) {
                    planAdder(newPlan);
                }
            }

            break;
        }
        case "deletePlan": {
            // delete course
            if (planDeleter != undefined) {
                setShowMessage(true);
                setModalHeader("Deletion");
                setModalMessage("The plan has been removed!");
                planDeleter();
            }
            break;
        }
    }
}
