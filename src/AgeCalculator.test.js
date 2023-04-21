import { render, fireEvent, screen } from "@testing-library/react";
import AgeCalculator from "./AgeCalculator";
import "@testing-library/jest-dom";
import { within } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

describe("AgeCalculator", () => {
  it("age should be calculated correctly when valid date is selected", async () => {
    render(<AgeCalculator />);

    const datePicker = screen.getByTestId('date-picker').querySelector('input')
    userEvent.clear(datePicker)
    userEvent.type(datePicker, '01/04/2005')

    const calculateAgeButton = screen.getByRole("button", { name: "Calculate Age" });
    fireEvent.click(calculateAgeButton);

    const gridElement = screen.getByTestId('age-grid');
    const agetext = within(gridElement).getByTestId('age-text');
    expect(agetext).toHaveTextContent('You are 18 years, 3 months, and 17 days old.'); 
  });


  it("should display error message if birth date is not selected", () => {
    render(<AgeCalculator />);
    const calculateButton = screen.getByText("Calculate Age");

    fireEvent.click(calculateButton);

    const errorMessage = screen.getByText("Please select a valid date");

    expect(errorMessage).toBeInTheDocument();
  });

  it("should display the 'Choose your birth date' label", () => {
    render(<AgeCalculator />);
    const label = screen.getByText("Choose your birth date");

    expect(label).toBeInTheDocument();
  });
});