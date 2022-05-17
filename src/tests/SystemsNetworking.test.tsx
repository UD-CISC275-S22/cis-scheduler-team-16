import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("Test Restricted Electives for Systems and Networking Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Systems and Networking");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC360");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CISC360");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}MATH349");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("CISC360");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
    test("Test Restricted Electives for Systems and Networking Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Systems and Networking");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC361");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CISC361");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}MATH349");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("CISC361");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
    test("Test Restricted Electives for Systems and Networking Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Systems and Networking");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC372");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CISC372");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}MATH349");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("CISC372");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
    test("Test Restricted Electives for Systems and Networking Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Systems and Networking");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC450");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CISC450");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}MATH349");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("CISC450");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
    test("Test Restricted Electives for Systems and Networking Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Systems and Networking");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC471");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CISC471");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}MATH349");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("CISC471");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
    test("Test MATH205 for Systems and Networking Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Systems and Networking");

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
    test("Test Security Requirement for Systems and Networking Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Systems and Networking");

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
            "Concentration Requirement: Security"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test Advanced Systems Req for Systems and Networking Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Systems and Networking");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC437");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CISC437");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CISC453");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("CISC437");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
    test("Test Restricted Electives for Systems and Networking Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Systems and Networking");

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
