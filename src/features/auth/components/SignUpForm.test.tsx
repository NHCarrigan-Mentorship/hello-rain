import { screen } from "@testing-library/react";
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
});
