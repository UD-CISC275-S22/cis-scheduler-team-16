import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("Test CISC304 for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC304");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC304");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC304");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC304"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CISC372 for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

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
    test("Test CISC437 for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC437");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC437");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC437");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC437"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CISC481 for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC481");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC481");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC481");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC481"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH205 for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

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
            "Concentration Requirement: MATH205"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH242 for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH242");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH242");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH242");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH242"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH243 for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH243");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH243");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH243");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH243"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH349 for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH349");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH349");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH349");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH349"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CISC483 for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC483");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC483");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC483");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: Advanced Data"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH302 for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH302");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH302");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH302");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: Advanced Math"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });

    test("Test Restricted Electives for Data Science Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Data Science");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC361");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CISC361");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CISC410");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("CISC361");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
});
