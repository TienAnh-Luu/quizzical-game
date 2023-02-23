import { render, screen } from "@testing-library/react";
import BackButton from "../BackButton";
import { BrowserRouter } from "react-router-dom";

describe("back button", () => {
  test("renders correctly", () => {
    const RouterComponent = () => (
      <BrowserRouter>
        <BackButton />
      </BrowserRouter>
    );
    render(<RouterComponent />);
    const leftArrowIconElement = screen.getByTestId("back-button");
    expect(leftArrowIconElement).toBeVisible();
  });
});
