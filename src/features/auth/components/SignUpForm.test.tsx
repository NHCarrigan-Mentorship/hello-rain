import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "vitest";
import { renderWithProviders } from "../../../test/renderWithProviders";
import SignUpForm from "./SignUpForm";

const mockSignUp = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../../shared/contexts/AuthContext", () => ({
  useAuth: () => ({
    login: vi.fn(),
    user: null,
    uiCachedUser: null,
    isAuthenticated: false,
    sessionLoading: false,
    signup: mockSignUp,
    logout: vi.fn(),
    updateProfile: vi.fn(),
    deleteProfile: vi.fn(),
  }),
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SignUpForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders sign up fields and button", () => {
    renderWithProviders(<SignUpForm />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i }));
  });

  it("signs up when submitted", async () => {
    mockSignUp.mockResolvedValueOnce(undefined);

    renderWithProviders(<SignUpForm />);

    const user = userEvent.setup();

    const email = "janedoe@email.com";
    const fullName = "Jane Doe";
    const username = "janedoe";
    const password = "9A%L^NmrYAnG%K";

    await user.type(screen.getByLabelText("Email"), email);
    await user.type(screen.getByLabelText("Full Name"), fullName);
    await user.type(screen.getByLabelText("Username"), username);
    await user.type(screen.getByLabelText("Password"), password);

    await user.click(screen.getByRole("button", { name: /sign up/i }));

    expect(mockSignUp).toHaveBeenCalledWith(
      email,
      fullName,
      username,
      password,
    );
    expect(mockNavigate).toHaveBeenCalledWith("/verify", {
      state: { email: email },
    });       
  });
});
