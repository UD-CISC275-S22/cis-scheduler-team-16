import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("CISC304 Requirement for Theory and Computation (Continuous Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );

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
    test("CISC401 Requirement for Theory and Computation (Continuous Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC401");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC401");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC401");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC401"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("MATH242 Requirement for Theory and Computation (Continuous Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );

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
    test("MATH349 Requirement for Theory and Computation (Continuous Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );

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
    test("Probability Requirement for Theory and Computation (Continuous Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );

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
    test("MATH243 Requirement for Theory and Computation (Continuous Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );

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
    test("MATH302 Requirement for Theory and Computation (Continuous Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );

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
            "Concentration Requirement: MATH302"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("MATH535 Requirement for Theory and Computation (Continuous Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH535");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH535");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH535");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH535"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("MATH426 Requirement for Theory and Computation (Continuous Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH426");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH426");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH426");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH426"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test Restricted Electives for Theory and Computation (Continuous Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );

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
});
