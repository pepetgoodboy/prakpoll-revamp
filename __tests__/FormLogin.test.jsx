import { render, screen } from "@testing-library/react";
import FormLogin from "@/app/components/form/FormLogin";
import { useRouter } from "next/navigation";
import { useActionState } from "@/app/actions";
import "@testing-library/jest-dom";

// Mocking useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking useActionState
jest.mock("@/app/actions", () => ({
  useActionState: jest.fn(),
  loginAction: jest.fn(),
}));

// Mocking toast
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mocking other components
jest.mock("@/app/components/label/LabelAuth", () => () => <div>Label</div>);
jest.mock("@/app/components/input/InputAuth", () => () => <input />);
jest.mock("@/app/components/button/ButtonAuth", () => {
  return function MockButtonAuth(props) {
    return <button data-testid="submit-button">{props.text}</button>;
  };
});
jest.mock("@/app/components/spinner/Spinner", () => {
  return function MockSpinner() {
    return <div data-testid="spinner" className="spinner-mock"></div>;
  };
});

describe("FormLogin", () => {
  beforeEach(() => {
    // Setup default mocks
    useRouter.mockReturnValue({ push: jest.fn() });
    useActionState.mockReturnValue([null, jest.fn(), false]);
  });

  it("should render the login form correctly", () => {
    // Render form login
    render(<FormLogin />);

    // Check if form elements are rendered
    expect(screen.getAllByText("Label")).toHaveLength(2); // 2 labels
    expect(screen.getByText("Masuk")).toBeInTheDocument(); // Submit button
  });
});
