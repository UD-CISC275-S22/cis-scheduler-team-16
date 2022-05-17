import { Course, CourseBackup } from "../../templates/course";
import { Plan } from "../../templates/plan";
import planList from "../../templates/PlansList.json";
import { Semester } from "../../templates/semester";

export function getInitialPlans() {
    const toReturn = planList.map(
        (plan): Plan => ({
            ...plan,
            semesters: plan.semesters.map(
                (semester): Semester => ({
                    ...semester,
                    courses: semester.courses.map(
                        (course): Course => ({
                            ...course,
                            backup: course.backup as CourseBackup
                        })
                    )
                })
            )
        })
    );
    return toReturn;
}
