import { render, screen, fireEvent } from "@testing-library/react";
import FormPage from "../FormPage";
import { BrowserRouter } from "react-router-dom";

const setup = () => {
  const RouterComponent = () => (
    <BrowserRouter>
      <FormPage />
    </BrowserRouter>
  );
  const utils = render(<RouterComponent />);
  const input = screen.getByTestId("amount-input");
  let cateOptions = screen.getAllByTestId("cate-select-option");
  let diffOptions = screen.getAllByTestId("diff-select-option");

  return {
    input,
    cateOptions,
    diffOptions,
    ...utils,
  };
};

describe("form page", () => {
  test("renders correctly", () => {
    const RouterComponent = () => (
      <BrowserRouter>
        <FormPage />
      </BrowserRouter>
    );
    render(<RouterComponent />);

    expect(screen.getByTestId("back-button")).toBeVisible();
    expect(screen.getByText("Number of Questions:")).toBeVisible();
    expect(screen.getByTestId("amount-input")).toBeVisible();
    expect(screen.getByText("Select Category:")).toBeVisible();
    expect(screen.getByTestId("category-select")).toBeVisible();
    expect(screen.getByText("Select Difficulty:")).toBeVisible();
    expect(screen.getByTestId("difficulty-select")).toBeVisible();
    expect(screen.getByText("Let's Play")).toBeVisible();
  });

  test("renders default value correctly", () => {
    const RouterComponent = () => (
      <BrowserRouter>
        <FormPage />
      </BrowserRouter>
    );
    render(<RouterComponent />);

    expect(screen.getByTestId("amount-input")).toHaveValue(5);
    let cateOptions = screen.getAllByTestId("cate-select-option");
    expect(cateOptions[0].selected).toBeTruthy();
    let diffOptions = screen.getAllByTestId("diff-select-option");
    expect(diffOptions[0].selected).toBeTruthy();
  });

  test("renders selected value correctly", () => {
    const { input, cateOptions, diffOptions } = setup();

    fireEvent.change(input, { target: { value: "10" } });
    expect(input.value).toBe("10");

    fireEvent.change(screen.getByTestId("category-select"), {
      target: { value: 14 },
    });
    expect(cateOptions[0].selected).toBeFalsy();
    expect(cateOptions[1].selected).toBeFalsy();
    expect(cateOptions[2].selected).toBeFalsy();
    expect(cateOptions[3].selected).toBeFalsy();
    expect(cateOptions[4].selected).toBeFalsy();
    expect(cateOptions[5].selected).toBeFalsy();
    expect(cateOptions[6].selected).toBeTruthy();
    expect(cateOptions[7].selected).toBeFalsy();

    fireEvent.change(screen.getByTestId("difficulty-select"), {
      target: { value: "medium" },
    });
    expect(diffOptions[0].selected).toBeFalsy();
    expect(diffOptions[1].selected).toBeFalsy();
    expect(diffOptions[2].selected).toBeTruthy();
    expect(diffOptions[3].selected).toBeFalsy();
  });
});
