import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("Check restricted elevtive counter for AI Concentration", () => {
        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC436");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC436");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC436");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();
    });
});
