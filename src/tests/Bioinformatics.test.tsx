import React from "react";
import { render, screen } from "@testing-library/react";
import { PlanViewer } from "../components/PlanViewer";
import userEvent from "@testing-library/user-event";

describe("Planner Tests", () => {
    beforeEach(() => {
        render(<PlanViewer />);
    });
    test("Test BISC207 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("BISC207");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "BISC207");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("BISC207");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const expandButton = screen.getByTestId("expand-problems");
        expandButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: BISC207"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test BISC208 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("BISC208");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "BISC208");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("BISC208");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: BISC208"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test BISC401 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("BISC401");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "BISC401");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("BISC401");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: BISC401"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CHEM103 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CHEM103");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CHEM103");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CHEM103");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CHEM103"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CHEM133 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CHEM133");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CHEM133");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CHEM133");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CHEM133"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CHEM104 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CHEM104");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CHEM104");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CHEM104");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CHEM104"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CHEM134 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CHEM134");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CHEM134");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CHEM134");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CHEM134"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CISC372 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CISC372");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "CISC372");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("CISC372");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC372"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test CISC436 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

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

        const checkProblems = screen.queryByText(
            "Concentration Requirement: CISC436"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH242 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH242");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH242");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH242");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH242"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH349 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("MATH349");
        expect(titleInstances).not.toBeInTheDocument();
        userEvent.type(textboxes[0], "MATH349");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const titleInstancesFinal = screen.queryByText("MATH349");
        expect(titleInstancesFinal).toBeInTheDocument();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: MATH349"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test Core Chem for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CHEM213");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CHEM213");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CHEM215");
        submitButton.click();
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: Organic"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test Core Chem for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("CHEM321");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "CHEM321");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}CHEM325");
        submitButton.click();
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: Organic"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test MATH205 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

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
    test("Test CISC483 for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

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

        const checkProblems = screen.queryByText(
            "Concentration Requirement: Data Analysis"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
    test("Test Restricted Electives for Bioinformatics Concentration", () => {
        const select = screen.queryAllByRole("combobox");
        userEvent.selectOptions(select[1], "Bioinformatics");

        const textboxes = screen.queryAllByRole("textbox");
        const titleInstances = screen.queryByText("ANFS300");
        expect(titleInstances).not.toBeInTheDocument();

        userEvent.type(textboxes[0], "ANFS300");
        const submitButton = screen.getByTestId("submit-course-pool-button");
        submitButton.click();
        const closeButton = screen.getByTestId("close-modal-button");
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}ANFS310");
        submitButton.click();
        closeButton.click();

        userEvent.type(textboxes[0], "{selectall}{delete}BISC403");
        submitButton.click();
        closeButton.click();

        const checkProblems = screen.queryByText(
            "Concentration Requirement: Fewer than"
        );
        expect(checkProblems).not.toBeInTheDocument();
    });
});
