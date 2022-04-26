import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlanViewer } from "../components/PlanViewer";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("The website is displaying", () => {
        // Up to you to decide what your tests are!
        // Add more tests, more components, more test files!
        const title = screen.queryByText(/Choose your current plan/gi);
        expect(title).toBeInTheDocument();
    });

    test("The concentration is displaying", () => {
        // Up to you to decide what your tests are!
        // Add more tests, more components, more test files!
        const title = screen.queryByText(/Choose your planned concentration/gi);
        expect(title).toBeInTheDocument();
    });
    test("There are two select boxes", () => {
        expect(screen.queryAllByRole("combobox")).toHaveLength(2);
    });
    test("You can select another plan which displays it on the screen", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[0], "1");
        expect(screen.queryAllByText(/My Plan 2/gi)).toHaveLength(2);
    });
    test("Adding a new plan works", () => {
        const addPlan = screen.getByTestId("add-plan-button");
        addPlan.click();
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[0], "2");
        expect(screen.queryAllByText(/My Plan 3/gi)).toHaveLength(2);
    });
    test("Delete plan works", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[0], "0");
        const deletePlan = screen.getByTestId("delete-plan-button");
        deletePlan.click();
        expect(screen.queryAllByText(/My Plan 1/gi)).toHaveLength(0);
    });
    test("Deleting a new plan works", () => {
        const addPlan = screen.getByTestId("add-plan-button");
        addPlan.click();
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[0], "2");
        const deletePlan = screen.getByTestId("delete-plan-button");
        deletePlan.click();
        expect(screen.queryAllByText(/My Plan 3/gi)).toHaveLength(0);
    });
    test("There are 9 concentrations to choose from", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Artificial Intelligence");
        userEvent.selectOptions(select[1], "Bioinformatics");
        userEvent.selectOptions(select[1], "Cybersecurity");
        userEvent.selectOptions(select[1], "Data Science");
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Data Track)"
        );
        userEvent.selectOptions(
            select[1],
            "High Performance Computing (Math Track)"
        );
        userEvent.selectOptions(select[1], "Systems and Networking");
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Discrete Track)"
        );
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");
    });
});
