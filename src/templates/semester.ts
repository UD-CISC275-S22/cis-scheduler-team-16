import { Course } from "./course";

/***
 * A representation of courses being taken in a semester
 */
export interface Semester {
    id: string;
    /** The term of the semester. */
    term: string;
    /** Year of the semester. */
    year: number;
    /** Array of courses that are being taken. */
    courses: Course[];
}
