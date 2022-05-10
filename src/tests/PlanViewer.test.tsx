import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlanViewer } from "../components/PlanViewer";

describe("Planner Tests", () => {
    beforeEach(() => {
        //making the initial data be initial plan
        render(<PlanViewer />);
        //adding Spring 2022
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const termSelect = screen.getByTestId("term-dropdown");
        userEvent.selectOptions(termSelect, "Spring");
        const inputBox = screen.getByTestId("year-textbox");
        userEvent.type(inputBox, "2022");
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        //setting course pool to add courses to Spring 2022
        const termSelect2 = screen.getByTestId("course-pool-term-dropdown");
        userEvent.selectOptions(termSelect2, "Spring");
        const inputBox2 = screen.getByTestId("course-pool-entry-box");
        const addCourse = screen.getByTestId("addCourse-pool-button");
        //adding courses to Spring 2022
        userEvent.type(inputBox2, "ENGL110");
        addCourse.click();
        userEvent.clear(inputBox2);
        userEvent.type(inputBox2, "MATH210");
        addCourse.click();
        userEvent.clear(inputBox2);
        userEvent.type(inputBox2, "CISC108");
        addCourse.click();
        userEvent.clear(inputBox2);
        userEvent.type(inputBox2, "CISC181");
        addCourse.click();
        userEvent.clear(inputBox2);
        //now adding a fall 2022 semester
        addSem.click();
        const termSelect3 = screen.getByTestId("term-dropdown");
        userEvent.selectOptions(termSelect3, "Fall");
        const insSem2 = screen.getByTestId("insertSem-button");
        insSem2.click();
        //setting course pool to add courses to Fall 2022
        userEvent.selectOptions(termSelect2, "Fall");
        //adding courses to Fall 2022
        userEvent.type(inputBox2, "CISC220");
        addCourse.click();
        userEvent.clear(inputBox2);
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
        userEvent.selectOptions(select[1], "Traditional Computer Science (BS)");
    });
});
