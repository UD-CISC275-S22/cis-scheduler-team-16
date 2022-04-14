/** This is an interface that will be used to preserve the original data for a course */
export interface CourseBackup {
    courseId: string;
    name: string;
    prereqs: string[];
    credithours: number;
    satisfied_requirements: string[];
}

/***
 * A representation of a course that can be taken
 */
export interface Course {
    /** The ID of the course. */
    courseId: string;
    /** Name of the course. */
    name: string;
    /** Array of courses that are prerequesites. */
    prereqs: string[];
    /** How many credit hours the course is worth. */
    credithours: number;
    /** What kinds of school requirements this will fulfill */
    satisfied_requirements: string[];
}
