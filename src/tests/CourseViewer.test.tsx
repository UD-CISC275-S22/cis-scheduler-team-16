import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("Check to make sure the course ID is displayed correctly", () => {
        const title = screen.queryByText("ENGL110");
        expect(title).toBeInTheDocument();
    });
    test("Check to make sure the course title is displayed correctly", () => {
        const title = screen.queryByText("Introductory English");
        expect(title).toBeInTheDocument();
    });
    test("Check to make sure the credit display is working correctly", () => {
        const instancesOfThreeCredits = screen.getAllByText("3 Credits");
        expect(instancesOfThreeCredits.length).toEqual(4);
    });
    test("Check to see if the move button is rendered in", () => {
        const moveButtons = screen.getAllByTestId("move-course-button");
        expect(moveButtons.length).toEqual(5);
    });
    test("Check to see that clicking the move button opens the move window and that all the elements are there", () => {
        const initialMoveHeader = screen.queryByText(
            "Move Course to another Semester:"
        );
        const initialMoveUpButton = screen.queryByTestId(
            "move-course-up-button"
        );
        const initialMoveDownButton = screen.queryByTestId(
            "move-course-down-button"
        );
        const initialMoveBox = screen.queryByTestId("change-semester-box");
        expect(initialMoveHeader).not.toBeInTheDocument();
        expect(initialMoveUpButton).not.toBeInTheDocument();
        expect(initialMoveDownButton).not.toBeInTheDocument();
        expect(initialMoveBox).not.toBeInTheDocument();
        const moveButtons = screen.getAllByTestId("move-course-button");
        moveButtons[0].click();
        const afterMoveHeader = screen.queryByText(
            "Move Course to another Semester:"
        );
        const afterMoveBody = screen.queryByText(
            "Enter the term and the year of your semester here:"
        );
        const afterMoveUpButton = screen.queryByTestId("move-course-up-button");
        const afterMoveDownButton = screen.queryByTestId(
            "move-course-down-button"
        );
        const afterMoveBox = screen.queryByTestId("change-semester-box");
        expect(afterMoveHeader).toBeInTheDocument();
        expect(afterMoveBody).toBeInTheDocument();
        expect(afterMoveUpButton).toBeInTheDocument();
        expect(afterMoveDownButton).toBeInTheDocument();
        expect(afterMoveBox).toBeInTheDocument();
    });
    /** CHECK IN AND SEE HOW THE BEST WAY TO TEST MOVING THE COURSES WITHIN THE SEMESTERS ARE */
    test("Check to see if the edit mode options are initially hidden", () => {
        const initHeader = screen.queryByText("Overwrite Course Properties");
        const initIDBox = screen.queryByTestId("change-course-id-box");
        const initTitleBox = screen.queryByTestId("change-course-name-box");
        const initCredBox = screen.queryByTestId("change-course-credits-box");
        const initPrereqBox = screen.queryByTestId("change-course-prereqs-box");
        expect(initHeader).not.toBeInTheDocument();
        expect(initIDBox).not.toBeInTheDocument();
        expect(initTitleBox).not.toBeInTheDocument();
        expect(initCredBox).not.toBeInTheDocument();
        expect(initPrereqBox).not.toBeInTheDocument();
    });
    test("Check to see if the edit mode options show once the edit button is clicked", () => {
        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const initHeader = screen.queryByText("Overwrite Course Properties");
        const initIDBox = screen.queryByTestId("change-course-id-box");
        const initTitleBox = screen.queryByTestId("change-course-name-box");
        const initCredBox = screen.queryByTestId("change-course-credits-box");
        const initPrereqBox = screen.queryByTestId("change-course-prereqs-box");
        expect(initHeader).toBeInTheDocument();
        expect(initIDBox).toBeInTheDocument();
        expect(initTitleBox).toBeInTheDocument();
        expect(initCredBox).toBeInTheDocument();
        expect(initPrereqBox).toBeInTheDocument();
    });
    test("Check to see if the edit mode options start with the right data", () => {
        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const initIDBox = screen.queryByTestId("change-course-id-box");
        const initTitleBox = screen.queryByTestId("change-course-name-box");
        const initCredBox = screen.queryByTestId("change-course-credits-box");
        const initPrereqBox = screen.queryByTestId("change-course-prereqs-box");
        expect(initIDBox).toHaveValue("ENGL110");
        expect(initTitleBox).toHaveValue("Introductory English");
        expect(initCredBox).toHaveValue(3);
        expect(initPrereqBox).toHaveValue("");
    });
    test("Check to see if changing the course ID works", () => {
        const initValue = screen.queryByText("Introductory English (Edited)");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const initIDBox = screen.getAllByRole("textbox");
        userEvent.type(initIDBox[0], " (Edited)");

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("Introductory English (Edited)");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if changing the course ID works", () => {
        const initValue = screen.queryByText("ENGL110X");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const initIDBox = screen.getAllByRole("textbox");
        userEvent.type(initIDBox[1], "X");

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("ENGL110X");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if changing the course credit hours works", () => {
        const initValue = screen.queryAllByText("3 Credits");
        const initValue2 = screen.queryAllByText("30 Credits");
        expect(initValue.length).toBe(4);
        expect(initValue2.length).toBe(0);

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const initIDBox = screen.getAllByRole("spinbutton");
        userEvent.type(initIDBox[0], "0");

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryAllByText("3 Credits");
        const finalValue2 = screen.queryAllByText("30 Credits");
        expect(finalValue.length).toBe(3);
        expect(finalValue2.length).toBe(1);
    });
    test("Check to see if changing the prerequisites works", () => {
        const initValue = screen.queryAllByText("None");
        const initValue2 = screen.queryAllByText("Prerequisite1");
        expect(initValue.length).toBe(5);
        expect(initValue2.length).toBe(0);

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const initIDBox = screen.getAllByRole("textbox");
        userEvent.type(initIDBox[2], "Prerequisite1");

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryAllByText("None");
        const finalValue2 = screen.queryAllByText("Prerequisite1");
        expect(finalValue.length).toBe(4);
        expect(finalValue2.length).toBe(1);
    });
});
