import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, GraduationCap, LogOut, FileSearch, Menu, X, Search, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { href: "/dashboard", label: "Visão Geral", icon: LayoutDashboard },
    { href: "/dashboard/turmas", label: "Minhas Turmas", icon: GraduationCap },
    { href: "/dashboard/tarefas", label: "Tarefas", icon: FileCode },
    { href: "/dashboard/alunos", label: "Submissions", icon: Users },
    { href: "/dashboard/analisar", label: "Analisar Texto", icon: Search },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Logo />
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="mb-6 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <FileSearch className="w-4 h-4 text-accent" /> Painel de Controle
          </div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
           <div className="flex items-center gap-3 mb-4 px-2">
             <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                {user?.name.charAt(0)}
             </div>
             <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
             </div>
           </div>
           <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={logout}>
             <LogOut className="mr-2 h-4 w-4" /> Sair da conta
           </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 flex items-center justify-between px-4 border-b border-border bg-card">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)}>
             <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1 flex justify-center">
            <Logo />
          </div>
          <Button variant="ghost" size="icon" onClick={logout} className="text-destructive">
             <LogOut className="h-5 w-5" />
          </Button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-card border-r border-border animate-fade-in">
              <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                <Logo />
                <Button variant="ghost" size="icon" onClick={() => setMobileOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 px-4 py-6 space-y-2">
                <div className="mb-6 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <FileSearch className="w-4 h-4 text-accent" /> Painel de Controle
                </div>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
              <div className="p-4 border-t border-border">
                <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => { logout(); setMobileOpen(false); }}>
                  <LogOut className="mr-2 h-4 w-4" /> Sair da conta
                </Button>
              </div>
            </aside>
          </div>
        )}

        {/* Topbar genérica estática desktop para breadcrumbs/ações seria aqui */}
        <div className="hidden md:flex h-16 border-b border-border items-center px-8 bg-card/20">
            <h2 className="text-sm font-medium text-muted-foreground">
               Área do Professor <span className="mx-2">/</span> <span className="text-foreground capitalize">{location.pathname.split("/").pop() || "Visão Geral"}</span>
            </h2>
        </div>

        <div className="flex-1 overflow-y-auto bg-muted/10">
           <div className="container p-4 md:p-8 animate-fade-in">
              <Outlet />
           </div>
        </div>
      </main>
    </div>
  );
}
