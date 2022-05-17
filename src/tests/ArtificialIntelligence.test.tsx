import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("Test Restricted Electives for AI Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Artificial Intelligence");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC436");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CISC436");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CISC437");
        submitButton.click();
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CISC489");
        submitButton.click();
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CISC889");
        submitButton.click();
        closeButton.click();

        const titleInstancesFinal = screen.queryByText("CISC436");
        expect(titleInstancesFinal).toBeInTheDocument();
    });
    test("Test CISC304 for AI Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Artificial Intelligence");

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
    });
    test("Test CISC442 for AI Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Artificial Intelligence");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC442");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC442");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC442");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();
    });
    test("Test CISC481 for AI Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Artificial Intelligence");

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
    });
    test("Test CISC483 for AI Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Artificial Intelligence");

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
    });
    test("Test CISC484 for AI Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Artificial Intelligence");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC484");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC484");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC484");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();
    });
    test("Test MATH205 for AI Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Artificial Intelligence");

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
    });
    test("Test CISC361 for AI Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Artificial Intelligence");

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
    });
});
