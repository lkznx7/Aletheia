import { ReactNode } from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EnrollSchool from "../pages/EnrollSchool";
import ContactTeam from "../pages/ContactTeam";
import NotFound from "../pages/NotFound";
import Index from "../pages/Index";

const AuthWrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </AuthProvider>
);

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: AuthWrapper });
};

describe("QA: Autenticação", () => {
  describe("Login", () => {
    it("✓ Renderiza formulário de login", () => {
      renderWithRouter(<Login />);
      expect(screen.getByRole("heading", { name: /bem-vindo/i })).toBeInTheDocument();
    });

    it("✓ Campos de email e senha presentes", () => {
      renderWithRouter(<Login />);
      expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    });

    it("✓ Botão de submit presente", () => {
      renderWithRouter(<Login />);
      expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
    });

    it("✓ Link para cadastro presente", () => {
      renderWithRouter(<Login />);
      expect(screen.getByRole("link", { name: /cadastre-se/i })).toBeInTheDocument();
    });

    it("✓ Credenciais mock pré-preenchidas", () => {
      renderWithRouter(<Login />);
      expect(screen.getByDisplayValue("test@test.com")).toBeInTheDocument();
    });
  });

  describe("Register", () => {
    it("✓ Renderiza formulário de cadastro", () => {
      renderWithRouter(<Register />);
      expect(screen.getByRole("heading", { name: /crie sua conta/i })).toBeInTheDocument();
    });

    it("✓ Campos obrigatórios presentes", () => {
      renderWithRouter(<Register />);
      expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    });

    it("✓ Botão de submit presente", () => {
      renderWithRouter(<Register />);
      expect(screen.getByRole("button", { name: /cadastrar/i })).toBeInTheDocument();
    });
  });
});

describe("QA: Formulários", () => {
  describe("EnrollSchool (Inscrição)", () => {
    it("✓ Renderiza formulário de inscrição", () => {
      renderWithRouter(<EnrollSchool />);
      expect(screen.getByRole("heading", { name: /inscrever/i })).toBeInTheDocument();
    });

    it("✓ Campos do formulário presentes", () => {
      renderWithRouter(<EnrollSchool />);
      expect(screen.getByLabelText(/nome da escola/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/nome do diretor/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/e-mail institucional/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
    });

    it("✓ Botão de submit presente", () => {
      renderWithRouter(<EnrollSchool />);
      expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
    });
  });

  describe("ContactTeam (Contato)", () => {
    it("✓ Renderiza formulário de contato", () => {
      renderWithRouter(<ContactTeam />);
      expect(screen.getByRole("heading", { name: /falar com o time/i })).toBeInTheDocument();
    });

    it("✓ Campos do formulário presentes", () => {
      renderWithRouter(<ContactTeam />);
      expect(screen.getByLabelText(/seu nome/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/assunto/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/mensagem/i)).toBeInTheDocument();
    });

    it("✓ Botão de submit presente", () => {
      renderWithRouter(<ContactTeam />);
      expect(screen.getByRole("button", { name: /enviar/i })).toBeInTheDocument();
    });
  });
});

describe("QA: Páginas de erro", () => {
  it("✓ Página 404 renderiza", () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByRole("heading", { name: /404/i })).toBeInTheDocument();
    expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument();
  });
});

describe("QA: Landing Page", () => {
  it("✓ Landing page renderiza sem erros", () => {
    renderWithRouter(<Index />);
    expect(screen.getByText(/copiloto do professor/i)).toBeInTheDocument();
  });
});