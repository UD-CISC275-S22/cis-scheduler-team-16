import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";

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
    test("An added course renders within the semester", () => {
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        const addCor = screen.getAllByTestId("addCourse-button");
        addCor[0].click();
        const title = screen.queryByText("Blank Name");
        expect(title).toBeInTheDocument();
    });
    test("Adding two courses render within the semester", () => {
        const addSem = screen.getByTestId("addSem-button");
        addSem.click();
        const insSem = screen.getByTestId("insertSem-button");
        insSem.click();
        const addCor = screen.getAllByTestId("addCourse-button");
        addCor[1].click();
        const title = screen.queryByText("Blank Name");
        expect(title).toBeInTheDocument();
        addCor[1].click();
        const title2 = screen.queryByText("2");
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
        const title = screen.queryByText("Blank Name");
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
