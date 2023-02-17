import { render, screen, fireEvent } from "@testing-library/react";
import HistoryPage from "../HistoryPage";
import { BrowserRouter } from "react-router-dom";

describe("history page", () => {
  beforeEach(() => {
    // to fully reset the state between tests, clear the storage
    localStorage.clear();
  });

  test("renders error notification when history data empty", () => {
    render(<HistoryPage />);
    expect(screen.getByAltText("error page")).toBeVisible();
  });

  test("renders correctly when get the exist history data", () => {
    const data = [
      {
        id: 1676447864951,
        name: "Sport Review",
        score: 5,
        noQuiz: 5,
        date: "2023-02-15",
      },
      {
        id: 1676447864952,
        name: "Sport abcxyz",
        score: 5,
        noQuiz: 5,
        date: "2023-02-15",
      },
    ];
    localStorage.setItem("history", JSON.stringify(data));
    render(<HistoryPage />, { wrapper: BrowserRouter });
    expect(screen.getByText("Sport Review")).toBeVisible();
    expect(screen.getByText("Sport abcxyz")).toBeVisible();
  });

  test("remove item when delete button clicked", () => {
    const data = [
      {
        id: 1676447864951,
        name: "Sport Review",
        score: 5,
        noQuiz: 5,
        date: "2023-02-15",
      },
      {
        id: 1676447864952,
        name: "Sport abcxyz",
        score: 5,
        noQuiz: 5,
        date: "2023-02-15",
      },
    ];
    localStorage.setItem("history", JSON.stringify(data));
    render(<HistoryPage />, { wrapper: BrowserRouter });
    fireEvent.click(screen.getByTestId("1676447864951")); // click 'delete' button
    expect(screen.queryByText("Sport Review")).not.toBeInTheDocument();
  });
});
