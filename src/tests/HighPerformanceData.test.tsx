import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("Test CISC437 for High Performance Computing (Data Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Data Track)"
        );

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
    test("Test MATH350 for High Performance Computing (Data Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Data Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH350");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH350");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH350");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH350"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH450 for High Performance Computing (Data Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Data Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH450");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH450");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH450");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH450"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CISC483 for High Performance Computing (Data Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Data Track)"
        );

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
            "Concentration Requirement: Machine Learning"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });

    test("Test Restricted Electives for High Performance Computing (Data Track) Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Data Track)"
        );

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH302");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "MATH302");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}MATH349");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("MATH302");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
});
