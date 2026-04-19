import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import NotFound from "./pages/NotFound.tsx";
import EnrollSchool from "./pages/EnrollSchool.tsx";
import ContactTeam from "./pages/ContactTeam.tsx";
import AuthCallback from "./pages/AuthCallback.tsx";

import { AuthProvider } from "./contexts/AuthContext.tsx";
import { AccessibilityProvider } from "./contexts/AccessibilityContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import DashboardLayout from "./components/layout/DashboardLayout.tsx";
import Overview from "./pages/dashboard/Overview.tsx";
import Classes from "./pages/dashboard/Classes.tsx";
import Students from "./pages/dashboard/Students.tsx";
import ClassReport from "./pages/dashboard/ClassReport.tsx";
import StudentDashboard from "./pages/dashboard/StudentDashboard.tsx";
import Upload from "./pages/dashboard/Upload.tsx";
import Assignments from "./pages/dashboard/Assignments.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AccessibilityProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/inscrever" element={<EnrollSchool />} />
            <Route path="/contato" element={<ContactTeam />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/google/callback" element={<AuthCallback />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Overview />} />
                <Route path="turmas" element={<Classes />} />
                <Route path="turmas/:id" element={<ClassReport />} />
                <Route path="alunos" element={<Students />} />
                <Route path="alunos/:id" element={<StudentDashboard />} />
                <Route path="analisar" element={<Upload />} />
                <Route path="tarefas" element={<Assignments />} />
              </Route>
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
        </AccessibilityProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
