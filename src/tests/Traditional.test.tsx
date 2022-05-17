import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("CISC361 Requirement for Traditional Computer Science (BS) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC361");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC361");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC361");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC361"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("CISC372 Requirement for Traditional Computer Science (BS) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC372");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC372");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC372");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC372"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });

    test("Probability Requirement for Traditional Computer Science (BS) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH205");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH205");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH205");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: Probability"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("CISC404 Requirement for Traditional Computer Science (BS) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC404");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC404");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC404");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC404"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("MATH245 Requirement for Traditional Computer Science (BS) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH245");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH245");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH245");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH245"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("MATH315 Requirement for Traditional Computer Science (BS) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH315");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH315");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH315");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH315"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("MATH451 Requirement for Traditional Computer Science (BS) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH451");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH451");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH451");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH451"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test Restricted Electives for Traditional Computer Science (BS) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC372");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CISC372");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CISC404");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("CISC372");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
    test("Test Restricted Electives for Traditional Computer Science (BS) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");

        const editButtons = screen.getAllByTestId("course-edit-button");
        editButtons[0].click();
        const customTickbox = screen.getByTestId("caf-radio-button");
        customTickbox.click();
        const creditHoursBox = screen.getAllByRole("spinbutton");
        userEvent.type(creditHoursBox[0], "100");
        const saveButton = screen.getByTestId("save-course-edit-button");
        saveButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: Fewer than"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
});
