import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Select, SelectItem } from "@/components/Select";

describe("Select", () => {
  it("should render a select without its menu", () => {
    render(
      <Select label="Select">
        <SelectItem value="select_item_1">Select Item 1</SelectItem>
      </Select>
    );
    const select = screen.getByRole("button");
    expect(select).toHaveClass("select");
    expect(select).toHaveTextContent("Select");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("should render a select with its menu", () => {
    render(
      <Select label="Select">
        <SelectItem value="select_item_1">Select Item 1</SelectItem>
      </Select>
    );
    const select = screen.getByRole("button");
    expect(select).toHaveClass("select");
    expect(select).toHaveTextContent("Select");
    act(() => {
      select.click();
    });
    expect(screen.getByText("Select Item 1")).toBeInTheDocument();
  });

  it("should render a select with its menu and select an item", () => {
    render(
      <Select label="Select">
        <SelectItem value="select_item_1">Select Item 1</SelectItem>
        <SelectItem value="select_item_2">Select Item 2</SelectItem>
      </Select>
    );
    const select = screen.getByRole("button");
    expect(select).toHaveClass("select");
    expect(select).toHaveTextContent("Select");
    act(() => {
      select.click();
    });
    expect(screen.getByText("Select Item 1")).toBeInTheDocument();
    expect(screen.getByText("Select Item 2")).toBeInTheDocument();
    act(() => {
      screen.getByText("Select Item 2").click();
    });
    expect(select).toHaveTextContent("Select Item 2");
  });
});
