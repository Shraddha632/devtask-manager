
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App.jsx";

afterEach(() => {
  cleanup();
});

describe("DevTask Manager", () => {
  it("renders the initial tasks", () => {
    render(<App />);

    expect(screen.getByText("Fix login page validation")).toBeInTheDocument();
    expect(screen.getByText("Update API documentation")).toBeInTheDocument();
  });

  it("filters pending tasks", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Pending" }));

    expect(screen.getByText("Fix login page validation")).toBeInTheDocument();
    expect(screen.queryByText("Update API documentation")).not.toBeInTheDocument();
  });

  it("shows validation for an empty task title", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Add task" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Please enter a task title."
    );
  });

  it("deletes a task", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", { name: "Delete Fix login page validation" })
    );

    expect(screen.queryByText("Fix login page validation")).not.toBeInTheDocument();
  });

  it("updates the completed count when a task is completed", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: "Mark Fix login page validation as completed",
      })
    );

    expect(screen.getByText("2/3")).toBeInTheDocument();
  });
});
