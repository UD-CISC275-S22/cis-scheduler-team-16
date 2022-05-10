import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        //making the initial data be initial plan
        render(<PlanViewer />);
        //adding Spring 2022
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const termSelect = screen.getByTestId("term-dropdown");
        userEvent.selectOptions(termSelect, "Spring");
        const inputBox = screen.getByTestId("year-textbox");
        userEvent.type(inputBox, "2022");
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        //setting course pool to add courses to Spring 2022
        const termSelect2 = screen.getByTestId("course-pool-term-dropdown");
        userEvent.selectOptions(termSelect2, "Spring");
        const inputBox2 = screen.getByTestId("course-pool-entry-box");
        const addCourse = screen.getByTestId("addCourse-pool-button");
        //adding courses to Spring 2022
        userEvent.type(inputBox2, "ENGL110");
        addCourse.click();
        userEvent.clear(inputBox2);
        userEvent.type(inputBox2, "MATH210");
        addCourse.click();
        userEvent.clear(inputBox2);
        userEvent.type(inputBox2, "CISC108");
        addCourse.click();
        userEvent.clear(inputBox2);
        userEvent.type(inputBox2, "CISC181");
        addCourse.click();
        userEvent.clear(inputBox2);
        //now adding a fall 2022 semester
        addSem.click();
        const termSelect3 = screen.getByTestId("term-dropdown");
        userEvent.selectOptions(termSelect3, "Fall");
        const insSem2 = screen.getByTestId("insertSem-button");
        insSem2.click();
        //setting course pool to add courses to Fall 2022
        userEvent.selectOptions(termSelect2, "Fall");
        //adding courses to Fall 2022
        userEvent.type(inputBox2, "CISC220");
        addCourse.click();
        userEvent.clear(inputBox2);
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
    test("Check to see that the move down button is working", () => {
        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();
        editModeButtons[1].click();
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes[2]).toHaveValue("Introductory English");
        editModeButtons[0].click();
        editModeButtons[1].click();

        const moveButtons = screen.getAllByTestId("move-course-button");
        moveButtons[0].click();
        const moveDownButton = screen.getByTestId("move-course-down-button");
        moveDownButton.click();

        const newEditModeButtons =
            screen.queryAllByTestId("course-edit-button");
        newEditModeButtons[0].click();
        newEditModeButtons[1].click();
        const newTextboxes = screen.getAllByRole("textbox");
        expect(newTextboxes[2]).toHaveValue("Discrete Mathematics");
    });
    test("Check to see that the move up button is working", () => {
        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();
        const textboxes = screen.getAllByRole("textbox");
        expect(textboxes[2]).toHaveValue("Introductory English");
        editModeButtons[0].click();

        const moveButtons = screen.getAllByTestId("move-course-button");
        moveButtons[1].click();
        const moveUpButton = screen.getByTestId("move-course-up-button");
        moveUpButton.click();

        const newEditModeButtons =
            screen.queryAllByTestId("course-edit-button");
        newEditModeButtons[0].click();
        const newTextboxes = screen.getAllByRole("textbox");
        expect(newTextboxes[3]).toHaveValue("Discrete Mathematics");
    });
    test("Check to see that moving to a new semester works", () => {
        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();
        const initTextboxes = screen.getAllByRole("textbox");
        expect(initTextboxes[2]).toHaveValue("Introductory English");
        editModeButtons[0].click();

        const moveButtons = screen.getAllByTestId("move-course-button");
        moveButtons[0].click();
        const moveTextbox = screen.getAllByRole("textbox");
        userEvent.type(moveTextbox[2], "Fall 2022");
        const selectButton = screen.getByTestId("change-semester-button");
        selectButton.click();

        const newEditModeButtons =
            screen.queryAllByTestId("course-edit-button");
        newEditModeButtons[4].click();
        const finalTextboxes = screen.getAllByRole("textbox");
        expect(finalTextboxes[2]).toHaveValue("Introductory English");
    });
    test("Check to see if the edit mode options are initially hidden", () => {
        const initHeader = screen.queryByText("Overwrite Course Properties");
        const initIDBox = screen.queryByTestId("change-course-id-box");
        const initTitleBox = screen.queryByTestId("change-course-name-box");
        const initCredBox = screen.queryByTestId("change-course-credits-box");
        const initPrereqBox = screen.queryByTestId("change-course-prereqs-box");
        const semBox = screen.queryByTestId("sem-radio-button");
        const fysBox = screen.queryByTestId("fys-radio-button");
        const dleBox = screen.queryByTestId("dle-radio-button");
        const mulBox = screen.queryByTestId("mul-radio-button");
        const cahBox = screen.queryByTestId("cah-radio-button");
        const hccBox = screen.queryByTestId("hcc-radio-button");
        const sbsBox = screen.queryByTestId("sbs-radio-button");
        const mntBox = screen.queryByTestId("mnt-radio-button");
        const capBox = screen.queryByTestId("cap-radio-button");
        const ulcBox = screen.queryByTestId("ulc-radio-button");
        const cppBox = screen.queryByTestId("cpp-radio-button");
        const uppBox = screen.queryByTestId("upp-radio-button");
        const cafBox = screen.queryByTestId("caf-radio-button");

        expect(initHeader).not.toBeInTheDocument();
        expect(initIDBox).not.toBeInTheDocument();
        expect(initTitleBox).not.toBeInTheDocument();
        expect(initCredBox).not.toBeInTheDocument();
        expect(initPrereqBox).not.toBeInTheDocument();
        expect(semBox).not.toBeInTheDocument();
        expect(fysBox).not.toBeInTheDocument();
        expect(dleBox).not.toBeInTheDocument();
        expect(mulBox).not.toBeInTheDocument();
        expect(cahBox).not.toBeInTheDocument();
        expect(hccBox).not.toBeInTheDocument();
        expect(sbsBox).not.toBeInTheDocument();
        expect(mntBox).not.toBeInTheDocument();
        expect(capBox).not.toBeInTheDocument();
        expect(ulcBox).not.toBeInTheDocument();
        expect(cppBox).not.toBeInTheDocument();
        expect(uppBox).not.toBeInTheDocument();
        expect(cafBox).not.toBeInTheDocument();
    });
    test("Check to see if the edit mode options show once the edit button is clicked", () => {
        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const initHeader = screen.queryByText("Overwrite Course Properties");
        const initIDBox = screen.queryByTestId("change-course-id-box");
        const initTitleBox = screen.queryByTestId("change-course-name-box");
        const initCredBox = screen.queryByTestId("change-course-credits-box");
        const initPrereqBox = screen.queryByTestId("change-course-prereqs-box");
        const semBox2 = screen.queryByTestId("sem-radio-button");
        const fysBox2 = screen.queryByTestId("fys-radio-button");
        const dleBox2 = screen.queryByTestId("dle-radio-button");
        const mulBox2 = screen.queryByTestId("mul-radio-button");
        const cahBox2 = screen.queryByTestId("cah-radio-button");
        const hccBox2 = screen.queryByTestId("hcc-radio-button");
        const sbsBox2 = screen.queryByTestId("sbs-radio-button");
        const mntBox2 = screen.queryByTestId("mnt-radio-button");
        const capBox2 = screen.queryByTestId("cap-radio-button");
        const ulcBox2 = screen.queryByTestId("ulc-radio-button");
        const cppBox2 = screen.queryByTestId("cpp-radio-button");
        const uppBox2 = screen.queryByTestId("upp-radio-button");
        const cafBox2 = screen.queryByTestId("caf-radio-button");

        expect(initHeader).toBeInTheDocument();
        expect(initIDBox).toBeInTheDocument();
        expect(initTitleBox).toBeInTheDocument();
        expect(initCredBox).toBeInTheDocument();
        expect(initPrereqBox).toBeInTheDocument();
        expect(semBox2).toBeInTheDocument();
        expect(fysBox2).toBeInTheDocument();
        expect(dleBox2).toBeInTheDocument();
        expect(mulBox2).toBeInTheDocument();
        expect(cahBox2).toBeInTheDocument();
        expect(hccBox2).toBeInTheDocument();
        expect(sbsBox2).toBeInTheDocument();
        expect(mntBox2).toBeInTheDocument();
        expect(capBox2).toBeInTheDocument();
        expect(ulcBox2).toBeInTheDocument();
        expect(cppBox2).toBeInTheDocument();
        expect(uppBox2).toBeInTheDocument();
        expect(cafBox2).toBeInTheDocument();
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
        userEvent.type(initIDBox[2], " (Edited)");

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
        userEvent.type(initIDBox[3], "X");

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
        userEvent.type(initIDBox[4], "Prerequisite1");

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryAllByText("None");
        const finalValue2 = screen.queryAllByText("Prerequisite1");
        expect(finalValue.length).toBe(4);
        expect(finalValue2.length).toBe(1);
    });
    test("Check to see if using the Seminar in Composition box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("sem");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const semBox = screen.getByTestId("sem-radio-button");
        semBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("sem");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the First Year Seminar box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("fys");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const fysBox = screen.getByTestId("fys-radio-button");
        fysBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("fys");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the Discovery Learning Experience box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("dle");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const dleBox = screen.getByTestId("dle-radio-button");
        dleBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("dle");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the Multicultural box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("mul");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("mul-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("mul");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the Creative Arts and Humanities box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("cah");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("cah-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("cah");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the History and Cultural Change box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("hcc");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("hcc-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("hcc");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the Social and Behavioral Changes box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("sbs");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("sbs-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("sbs");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the Math, Natural Sciences, and Technology box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("mnt");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("mnt-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("mnt");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the Capstone Requirement box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("cap");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("cap-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("cap");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the Upper Level Credit box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("ulc");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("ulc-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("ulc");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the Career and Professional Preparation box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("cpp");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("cpp-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("cpp");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the College of Engineering Upper Level Breadth box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("upp");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("upp-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("upp");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the Custom Area of Focus box updates the satisfied requirements", () => {
        const initValue = screen.queryByText("caf");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("caf-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const finalValue = screen.queryByText("caf");
        expect(finalValue).toBeInTheDocument();
    });
    test("Check to see if using the Custom Area of Focus box twice removes it from the satisfied requirements", () => {
        const initValue = screen.queryByText("caf");
        expect(initValue).not.toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();

        const mulBox = screen.getByTestId("caf-radio-button");
        mulBox.click();

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        mulBox.click();
        saveButton.click();

        const finalValue = screen.queryByText("caf");
        expect(finalValue).not.toBeInTheDocument();
    });
    test("Check to see if deleting a course works", () => {
        const initValue = screen.getByText("ENGL110");
        expect(initValue).toBeInTheDocument();

        const deleteButtons = screen.queryAllByTestId("course-delete-button");
        deleteButtons[0].click();

        const finalValue = screen.queryByText("ENGL110");
        expect(finalValue).not.toBeInTheDocument();
    });
    test("Check to see if reverting back a course works", () => {
        const initID = screen.getByText("ENGL110");
        const initName = screen.getByText("Introductory English");
        expect(initID).toBeInTheDocument();
        expect(initName).toBeInTheDocument();

        const editModeButtons = screen.queryAllByTestId("course-edit-button");
        editModeButtons[0].click();
        const textBoxes = screen.queryAllByRole("textbox");
        userEvent.type(textBoxes[2], " (EDITED)");
        userEvent.type(textBoxes[3], " (EDITED)");

        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const initID2 = screen.queryByText("ENGL110");
        const initName2 = screen.queryByText("Introductory English");
        expect(initID2).not.toBeInTheDocument();
        expect(initName2).not.toBeInTheDocument();

        const editModeButtons2 = screen.queryAllByTestId("course-edit-button");
        editModeButtons2[0].click();

        const revertButton = screen.getByTestId(
            "restore-default-properties-button"
        );
        revertButton.click();

        const initID3 = screen.getByText("ENGL110");
        const initName3 = screen.getByText("Introductory English");
        expect(initID3).toBeInTheDocument();
        expect(initName3).toBeInTheDocument();
    });
});
