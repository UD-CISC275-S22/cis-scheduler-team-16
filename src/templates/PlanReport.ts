/** This is a template that has information about the validity of
 * a plan's roster of courses
 */

export interface PlanReport {
    /** Says what kind of concentration this PLanReport is for */
    concentration: string;

    /** Is true if the plan has all the requirements to graduate */
    isValid: boolean;

    /** The number of credits in this plan */
    totalCredits: number;

    /** Contains error messages regarding what courses are missing */
    problems: string[];

    /**************************
     * UNIVERITY REQUIREMENTS *
     *************************/

    /** Boolean value that says whether the ENGL110 requirement is met*/
    hasENGL110: boolean;

    /** Boolean value that says whether the University Multicultural Requirement has been met */
    hasUnivMulticultural: boolean;

    /** Boolean value that says whether the University Capstone Requirement has been met */
    hasUnivCapstone: boolean;

    /** Boolean value that says whether the University Discovery Learning Experience requirement has been met */
    hasUnivDLE: boolean;
    univDLETotal: number;

    /** Boolean value that says whether or not the Univeristy Creative Arts and Humanities requirement has been met */
    hasUnivCAH: boolean;
    univCAHTotal: number;

    /** Boolean value that says whether or not the Univerity History and Cultural Change requirement has been met */
    hasUnivHCC: boolean;
    univHCCTotal: number;

    /** Boolean value that says whether or not the Univeristy Social and Behavioral Sciences requirement has been met */
    hasUnivSBS: boolean;
    univSBSTotal: number;

    /** Boolean value that says whether or not the University Math, Natural Science, and Technology requirement has been met */
    hasUnivMNST: boolean;
    univMNSTTotal: number;

    /** Boolean value that says whether or not the lab science requirement has been met */
    hasLabScience: boolean;

    /***************************************
     * COLLEGE OF ENGINEERING REQUIREMENTS *
     **************************************/

    /** Boolean representing whether the College of Engineering breadth requirements have been met
     * (Making sure that univCAHTotal + univHCCTotal + univSBSTotal >= 18)
     */

    hasCOEGeneralBreadth: boolean;

    /** Boolean representinbg whether the College of Engineering Upper Level Breadth requirement has been met */
    hasCOEUpperLevelBreadth: boolean;

    /********************************
     * COMPUER SCIENCE REQUIREMENTS *
     *******************************/

    /** Boolean representing whether the plan includes the English requirement (ENGL312 or ENGL410)*/
    hasEnglishReq: boolean;

    /** Booleans representing whether the CISC course classes are met INCLUDING CISC355 */
    hasCISCCore: boolean;

    /** Boolean representing whether concentration requirements are met */
    meetsConcentration: boolean;
}
