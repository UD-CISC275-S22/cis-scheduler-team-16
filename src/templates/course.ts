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
