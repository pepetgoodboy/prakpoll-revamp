import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ButtonAuth from "@/app/components/button/ButtonAuth";

describe("ButtonAuth", () => {
  it("renders all given props correctly", () => {
    render(<ButtonAuth text="Login" />);

    // Check props text
    const button = screen.getByRole("button", { name: "Login" });
    expect(button).toBeInTheDocument();
  });
});
