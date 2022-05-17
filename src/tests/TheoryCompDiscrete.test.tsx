import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("CISC304 Requirement for Theory and Computation (Discrete Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
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
    test("CISC401 Requirement for Theory and Computation (Discrete Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
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
    test("MATH242 Requirement for Theory and Computation (Discrete Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
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
    test("MATH349 Requirement for Theory and Computation (Discrete Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
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
    test("Probability Requirement for Theory and Computation (Discrete Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
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
    test("CISC404 Requirement for Theory and Computation (Discrete Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
        );

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
    test("MATH245 Requirement for Theory and Computation (Discrete Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
        );

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
    test("MATH315 Requirement for Theory and Computation (Discrete Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
        );

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
    test("MATH451 Requirement for Theory and Computation (Discrete Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
        );

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
    test("Test Restricted Electives for Theory and Computation (Discrete Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
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
