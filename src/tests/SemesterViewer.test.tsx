import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Semester Tests", () => {
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
    test("A semester component is rendered when added", () => {
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        const title = screen.queryByText("Fall 0");
        expect(title).toBeInTheDocument();
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
    /*
    test("", () => {
    });
    */
});
