import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { href: "#problema", label: "O problema" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#analise", label: "Análise ao vivo" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "/inscrever", label: "Inscrever escola" },
  { href: "/contato", label: "Falar com time" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <nav className="container flex items-center justify-between h-16" aria-label="Principal">
        <Logo />
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground mr-1">
                Olá, <strong className="text-foreground">{user?.name.split(" ")[0]}</strong>
              </span>
              <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10" asChild>
                <Link to="/dashboard">Acessar Painel</Link>
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="font-medium" asChild>
                <Link to="/login">Entrar</Link>
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary-glow font-medium" asChild>
                <Link to="/register">Cadastre-se</Link>
              </Button>
            </>
          )}
        </div>
        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2 text-foreground font-medium"
              >
                {l.label}
              </a>
            ))}
            {isAuthenticated ? (
               <div className="pt-2 mt-2 border-t border-border flex flex-col gap-2">
                 <span className="px-2 py-1 text-sm font-medium text-foreground">
                   Olá, {user?.name.split(" ")[0]}
                 </span>
                 <Button className="bg-primary/10 text-primary mt-1 hover:bg-primary/20" variant="ghost" asChild onClick={() => setOpen(false)}>
                   <Link to="/dashboard">Acessar Painel</Link>
                 </Button>
               </div>
            ) : (
              <Button className="bg-primary text-primary-foreground mt-2" asChild onClick={() => setOpen(false)}>
                <Link to="/register">Cadastre-se</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
