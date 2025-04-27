import { render, screen } from "@testing-library/react";
import AuthLayout from "@/app/components/layout/AuthLayout";
import "@testing-library/jest-dom";

describe("AuthLayout", () => {
  it("renders all given props correctly", () => {
    render(
      <AuthLayout
        title="Login"
        question="Belum"
        link="/register"
        linkTitle="Daftar"
      >
        <div>Form Login</div>
      </AuthLayout>
    );

    // Check Heading
    const heading = screen.getByRole("heading", { name: "Selamat Datang 👋" });
    expect(heading).toBeInTheDocument();

    // Check props title
    const title = screen.getByTestId("auth-title");
    expect(title).toHaveTextContent("Login");

    // Check props question
    const question = screen.getByText("Belum memiliki akun ?");
    expect(question).toBeInTheDocument();

    // Check props link and linkTitle
    const link = screen.getByRole("link", { name: "Daftar" });
    expect(link).toHaveAttribute("href", "/register");

    // Check children
    const children = screen.getByText("Form Login");
    expect(children).toBeInTheDocument();
  });
});
