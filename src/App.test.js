import { render, screen } from "@testing-library/react";
import App from "./App";

const renderWithRouter = (Component, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(Component);
};

describe("App", () => {
  test("renders Intro page as a home page", () => {
    render(<App />);

    expect(screen.getByText("Quizzical")).toBeVisible();
  });

  test("renders Questions page when path is /questions", () => {
    renderWithRouter(<App />, { route: "/questions" });

    expect(screen.getByText("Check answers")).toBeVisible();
  });

  test("renders History page when path is /history", () => {
    renderWithRouter(<App />, { route: "/history" });

    // expect(screen.getByText('History page')).toBeVisible();
  });

  test("renders Form page when path is /form", () => {
    renderWithRouter(<App />, { route: "/form" });

    expect(screen.getByText("Specify your questions")).toBeVisible();
  });
});
