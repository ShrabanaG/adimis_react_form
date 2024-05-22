import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";

// Custom text matcher function to find option within dropdown
const findOptionByText = (text: any) => {
	return screen.getByRole("option", { name: new RegExp(text, "i") });
};

describe("Home Component renders correctly", () => {
	test("Home components form labels renders correctly", () => {
		render(<Home />);

		// Check if all the form labels are rendered
		expect(screen.getByText("Username")).toBeInTheDocument();
		expect(screen.getByText("Email")).toBeInTheDocument();
		expect(screen.getByText("Address")).toBeInTheDocument();
		expect(screen.getByText("Phone")).toBeInTheDocument();
		expect(screen.getByText("Gender")).toBeInTheDocument();
		expect(screen.getByText("Enter Your Expertise")).toBeInTheDocument();
		expect(screen.getByLabelText(/Choose file to upload/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
		expect(screen.getByText("Password")).toBeInTheDocument();
		expect(screen.getByText("Year")).toBeInTheDocument();
	});

	test("Home components dropdown value selection", () => {
		render(<Home />);

		// Select gender from dropdown
		fireEvent.mouseDown(screen.getByText("Gender"));
		fireEvent.click(findOptionByText("Male"));

		// Select year from dropdown
		fireEvent.mouseDown(screen.getByText(/Year/i));
		fireEvent.click(findOptionByText("2023"));

		// Assert the selected values
		expect(screen.getByText("Male")).toBeInTheDocument();
		expect(screen.getByText("2023")).toBeInTheDocument();
	});
});
