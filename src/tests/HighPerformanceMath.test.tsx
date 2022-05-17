import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("Test CISC360 for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC360");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC360");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC360");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC360"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CISC361 for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
        );

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
    test("Test CISC372 for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
        );

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
    test("Test CISC450 for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC450");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC450");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC450");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC450"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CISC471 for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC471");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC471");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC471");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC471"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH242 for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
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
    test("Test MATH243 for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
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
    test("Test MATH351 for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH351");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH351");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH351");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH351"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH428 for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH428");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH428");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH428");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH428"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH205 for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
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
    test("Test Restricted Electives for High Performance Computing (Math Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH302");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "MATH205");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}MATH350");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("MATH205");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
});
