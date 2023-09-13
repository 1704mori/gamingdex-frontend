import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dropdown from "@/components/Dropdown";

describe("Dropdown", () => {
  it("should render a dropdown without its menu", () => {
    render(
      <Dropdown label="Dropdown">
        <Dropdown.Item>Dropdown Item 1</Dropdown.Item>
      </Dropdown>
    );
    const dropdown = screen.getByRole("button");
    expect(dropdown).toHaveClass("dropdown");
    expect(dropdown).toHaveTextContent("Dropdown");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("should render a dropdown with its menu", () => {
    render(
      <Dropdown label="Dropdown">
        <Dropdown.Item>Dropdown Item 1</Dropdown.Item>
      </Dropdown>
    );
    const dropdown = screen.getByRole("button");
    expect(dropdown).toHaveClass("dropdown");
    expect(dropdown).toHaveTextContent("Dropdown");
    act(() => {
      dropdown.click();
    });
    expect(screen.getByText("Dropdown Item 1")).toBeInTheDocument();
  });
});
