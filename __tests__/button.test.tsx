import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "@/components/Button";

describe("Button", () => {
  it("should render a button with primary color", () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
  });

  it("should render a button with accent color", () => {
    render(<Button color="accent">Accent</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-accent");
  });

  it("should render a button with accent2 color", () => {
    render(<Button color="accent2">Accent2</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-accent2");
  });

  it("should render a button with accent3 color", () => {
    render(<Button color="accent3">Accent3</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-accent3");
  });

  it("should render a button with primary color and disabled", () => {
    render(<Button disabled>Primary</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");
    expect(button).toBeDisabled();
  });
});
