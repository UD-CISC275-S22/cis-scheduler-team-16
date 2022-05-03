import { Course } from "../../templates/course";
import { Semester } from "../../templates/semester";
import DelawareCourseCatalog from "../../templates/DelawareCourseCatalog.json";

export function generateCoursePool(semesters: Semester[]) {
    const planCourseNames: string[] = [];
    const COURSE_POOL: Course[] = [];

    semesters.map((semester: Semester) => {
        semester.courses.map((course: Course) => {
            planCourseNames.push(course.courseId.toLowerCase());
        });
    });

    const COURSE_CATALOG: Record<string, Course> = DelawareCourseCatalog;
    Object.values(COURSE_CATALOG).map((course: Course) => {
        if (!planCourseNames.includes(course.backup.courseId.toLowerCase())) {
            COURSE_POOL.push(course);
        }
    });

    return COURSE_POOL;
}
