/** Template that returns whether a concentration's requirements have been met
 *  and what errors exist if its requirements aren't met
 */

export interface ConcentrationCheck {
    /** Boolean representing whether all of the concentration requirements have been met */
    meetsConcentrationRequirements: boolean;

    /** Array of strings that reflects what problems exist with this concentration */
    errorMessages: string[];
}
