import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("Test CISC361 for Cybersecurity Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Cybersecurity");

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
    test("Test CISC372 for Cybersecurity Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Cybersecurity");

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
    test("Test CISC450 for Cybersecurity Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Cybersecurity");

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
    test("Test CISC464 for Cybersecurity Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Cybersecurity");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC464");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC464");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC464");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC464"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CPEG465 for Cybersecurity Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Cybersecurity");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CPEG465");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CPEG465");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CPEG465");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CPEG465"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CPEG494 for Cybersecurity Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Cybersecurity");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CPEG494");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CPEG494");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CPEG494");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CPEG494"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH205 for Cybersecurity Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Cybersecurity");

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
    test("Test CPEG472 for Cybersecurity Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Cybersecurity");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CPEG472");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CPEG472");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CPEG473");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("CPEG472");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
    test("Test Restricted Electives for Cybersecurity Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Cybersecurity");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC436");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "MATH242");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}MATH349");
        submitButton.click();
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CISC489");
        submitButton.click();
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CISC889");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("MATH242");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
});
