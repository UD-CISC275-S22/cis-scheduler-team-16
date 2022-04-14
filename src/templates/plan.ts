import { Semester } from "./semester";

export interface Plan {
    name: string;
    id: string;
    semesters: Semester[];
}
