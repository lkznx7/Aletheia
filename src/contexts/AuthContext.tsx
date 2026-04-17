import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Injetar usuário de teste se não houver usuários salvos
    const usersStr = localStorage.getItem("fluid_users");
    if (!usersStr) {
      localStorage.setItem(
        "fluid_users",
        JSON.stringify([{ name: "Professor Teste", email: "test@test.com", password: "password123" }])
      );
    }

    // Tentar carregar a sessão via mock JWT token
    const token = localStorage.getItem("fluid_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token));
        setUser({ name: payload.name, email: payload.email, token });
      } catch (e) {
        localStorage.removeItem("fluid_token");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("fluid_users") || "[]");
    const foundUser = users.find((u: any) => u.email === email && u.password === password);

    if (foundUser) {
      // Criar payload e simular token JWT (Base64 encoded)
      const fakePayload = { name: foundUser.name, email: foundUser.email, role: "teacher" };
      const token = btoa(JSON.stringify(fakePayload));
      localStorage.setItem("fluid_token", token);
      setUser({ name: foundUser.name, email: foundUser.email, token });
      toast.success(`Bem-vindo(a) de volta, ${foundUser.name}!`);
      return true;
    } else {
      toast.error("Credenciais inválidas. Verifique e tente novamente.");
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem("fluid_users") || "[]");
    
    if (users.find((u: any) => u.email === email)) {
      toast.error("Este e-mail já está em uso.");
      return false;
    }

    // Inserir novo usuário no array
    users.push({ name, email, password });
    localStorage.setItem("fluid_users", JSON.stringify(users));

    // Fazer login automático
    const fakePayload = { name, email, role: "teacher" };
    const token = btoa(JSON.stringify(fakePayload));
    localStorage.setItem("fluid_token", token);
    setUser({ name, email, token });
    toast.success("Conta criada com sucesso!");
    return true;
  };

  const logout = () => {
    localStorage.removeItem("fluid_token");
    setUser(null);
    toast.success("Você desconectou da sua conta.");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
