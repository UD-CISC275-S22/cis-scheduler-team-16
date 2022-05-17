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
    test("There are three select boxes", () => {
        expect(screen.queryAllByRole("combobox")).toHaveLength(3);
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
        userEvent.selectOptions(
            select[1],
            "Theory and Computation (Continuous Track)"
        );
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");
    });
    test("Adding from the course pool works", () => {
        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("ANTH101");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "ANTH101");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("ANTH101");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();
    });
    test("Check that you can add to a course not in the first semester", () => {
        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("ANTH101");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "ANTH101");
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[2], "Spring");
        const entryBox = screen.getByTestId("course-pool-entry-box");
        userEvent.type(entryBox, "1");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
    });
    test("Check that you can update the date in the term selection box", () => {
        const textboxes = screen.queryAllByRole("textbox");
        expect(textboxes[1]).toHaveValue("2022");
        userEvent.type(textboxes[1], "2");
        const textboxes_final = screen.queryAllByRole("textbox");
        expect(textboxes_final[1]).toHaveValue("20222");
    });
    test("Expand requirements not met by plan", () => {
        const expandButton = screen.getByTestId("expand-problems");
        expandButton.click();
        const headerText = screen.queryByText(
            "Please correct the following issues:"
        );
        expect(headerText).toBeInTheDocument();
    });
    test("Test the Export CSV Button", () => {
        const exportButton = screen.getByTestId("export-csv-button");
        exportButton.click();
    });
    test("Test the show/hide import button", () => {
        const initialHeader = screen.queryByText("Upload a file");
        expect(initialHeader).not.toBeInTheDocument();
        const showButton = screen.getByTestId("show-hide-import-button");
        showButton.click();
        const finalHeader = screen.queryByText("Upload a file");
        expect(finalHeader).toBeInTheDocument();
    });
    test("Click import button", () => {
        const initialHeader = screen.queryByText("Upload a file");
        expect(initialHeader).not.toBeInTheDocument();
        const showButton = screen.getByTestId("show-hide-import-button");
        showButton.click();
        const importButton = screen.getByTestId("import-button");
        importButton.click();
    });
});
