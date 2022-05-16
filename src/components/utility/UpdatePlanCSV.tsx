import { Course } from "../../templates/course";
import { Semester } from "../../templates/semester";
import { Plan } from "../../templates/plan";

export function updatePlanCSV({
    content,
    curPlan,
    setCurPlan
}: {
    content: string;
    curPlan: Plan;
    setCurPlan: (plan: Plan) => void;
}) {
    const CSVarray = content.substring(62).split(",");
    const newSemesters: Semester[] = [];
    let newCourses: Course[] = [];
    let prevString = "";
    console.log("CSVarray ", CSVarray);
    for (let i = 0; i < CSVarray.length; i++) {
        if (
            (CSVarray[i].trim() === "Spring" &&
                CSVarray[i].trim() + CSVarray[i + 1] != prevString) ||
            (CSVarray[i].trim() === "Summer" &&
                CSVarray[i].trim() + CSVarray[i + 1] != prevString) ||
            (CSVarray[i].trim() === "Fall" &&
                CSVarray[i].trim() + CSVarray[i + 1] != prevString) ||
            (CSVarray[i].trim() === "Winter" &&
                CSVarray[i].trim() + CSVarray[i + 1] != prevString)
        ) {
            console.log("brand new semester detected, adding it to the plan");
            prevString = CSVarray[i].trim() + CSVarray[i + 1];
            newCourses = [];
            newCourses.push({
                name: CSVarray[i + 2],
                courseId: CSVarray[i + 3],
                credithours: +CSVarray[i + 4],
                prereqs: CSVarray[i + 5].split("/"),
                satisfied_requirements: CSVarray[i + 6].split("/"),
                backup: {
                    name: CSVarray[i + 2],
                    courseId: CSVarray[i + 3],
                    credithours: +CSVarray[i + 4],
                    prereqs: CSVarray[i + 5].split("/"),
                    satisfied_requirements: CSVarray[i + 6].split("/")
                }
            });

            newSemesters.push({
                id: i + 1 + "",
                term: CSVarray[i].trim(),
                year: +CSVarray[i + 1],
                courses: newCourses
            });
        } else if (
            CSVarray[i].trim() === "Spring" ||
            CSVarray[i].trim() === "Summer" ||
            CSVarray[i].trim() === "Fall" ||
            CSVarray[i].trim() === "Winter"
        ) {
            console.log("duplicate found, adding to prev semester array");
            prevString = CSVarray[i].trim() + CSVarray[i + 1];

            newCourses.push({
                name: CSVarray[i + 2],
                courseId: CSVarray[i + 3],
                credithours: +CSVarray[i + 4],
                prereqs:
                    CSVarray[i + 5] != "None"
                        ? CSVarray[i + 5].split("/")
                        : ["None"],
                satisfied_requirements:
                    CSVarray[i + 6] != "None"
                        ? CSVarray[i + 6].split("/")
                        : ["None"],
                backup: {
                    name: CSVarray[i + 2],
                    courseId: CSVarray[i + 3],
                    credithours: +CSVarray[i + 4],
                    prereqs: CSVarray[i + 5].split("/"),
                    satisfied_requirements: CSVarray[i + 6].split("/")
                }
            });

            newSemesters[newSemesters.length - 1] = {
                ...newSemesters[newSemesters.length - 1],
                courses: newCourses
            };
        }
    }

    //next step: loop through newSemesters array and for all the semesters with the same term AND year, then combine their array of courses
    //we can do this via pushing all of the courses we find for the semesters that are the same

    const CSV_PLAN: Plan = { ...curPlan, semesters: newSemesters };
    setCurPlan(CSV_PLAN); //CONVERT STRING TO NUMBER (INDEX)
}
