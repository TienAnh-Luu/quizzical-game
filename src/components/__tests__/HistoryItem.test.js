import { renderWithRouter, screen } from "@testing-library/react";
import HistoryItem from "../HistoryItem";

describe("history page", () => {
  test("renders correctly", () => {
    renderWithRouter(<HistoryItem />);
    const deleteIconElement = screen.getByTestId("delete-icon");
    expect(deleteIconElement).toBeVisible();
  });
});
