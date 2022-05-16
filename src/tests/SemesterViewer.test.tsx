import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Semester Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("A semester component is rendered when added", () => {
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        const title = screen.queryByText("Fall 0");
        expect(title).toBeInTheDocument();
    });
    test("Semesters can be removed from the plan", () => {
        const initial_values = screen.queryAllByText("Spring 2022");
        expect(initial_values.length).toBe(1);
        const deleteSemesterButtons = screen.queryAllByTestId(
            "deleteSemester-button"
        );
        deleteSemesterButtons[0].click();
        const final_values = screen.queryAllByText("Spring 2022");
        expect(final_values.length).toBe(0);
    });
    test("An added course renders within the semester", () => {
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        const addCor = screen.getAllByTestId("addCourse-button");
        addCor[0].click();
        const title = screen.queryByText("COUR05");
        expect(title).toBeInTheDocument();
    });
    test("Adding two courses render within the semester", () => {
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        const addCor = screen.getAllByTestId("addCourse-button");
        addCor[1].click();
        const title = screen.queryByText("COUR02");
        expect(title).toBeInTheDocument();
        addCor[1].click();
        const title2 = screen.queryByText("COUR03");
        expect(title2).toBeInTheDocument();
    });
    test("Clear semester button exists", () => {
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        const clearSem = screen.getAllByTestId("clearSemester-button");
        expect(clearSem[0]).toBeInTheDocument();
    });
    test("Adding semester button works", () => {
        const initial = screen.queryByText("Fall 0");
        expect(initial).not.toBeInTheDocument();
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        const initial_new = screen.queryByText("Fall 0");
        expect(initial_new).toBeInTheDocument();
    });
    test("Adding semester with different year works", () => {
        const initial = screen.queryByText("Fall 2020");
        expect(initial).not.toBeInTheDocument();
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const dropDown = screen.getByTestId("term-dropdown");
        userEvent.selectOptions(dropDown, "Spring");
        const inputBoxes = screen.getByTestId("year-textbox");
        userEvent.type(inputBoxes, "2020");
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        const initial_new = screen.queryByText("Spring 2020");
        expect(initial_new).toBeInTheDocument();
    });
    test("Can show/hide add semester window", () => {
        const initial = screen.queryAllByText("Pick a term and year");
        expect(initial.length).toBe(1);
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const second = screen.queryAllByText("Pick a term and year");
        expect(second.length).toBe(2);
        const closeButton = screen.getByTestId("cancelSem-button");
        closeButton.click();
        const third = screen.queryAllByText("Pick a term and year");
        expect(third.length).toBe(1);
    });
    test("Clear semester button works", () => {
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        const addCor = screen.getAllByTestId("addCourse-button");
        addCor[0].click();
        const title = screen.queryByText("COUR05");
        expect(title).toBeInTheDocument();
        const clearSem = screen.getAllByTestId("clearSemester-button");
        clearSem[0].click();
        expect(title).not.toBeInTheDocument();
    });
});
