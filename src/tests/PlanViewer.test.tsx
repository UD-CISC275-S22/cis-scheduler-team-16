import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";

describe("Quizzer Tests", () => {
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
});
