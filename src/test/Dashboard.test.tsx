import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Overview from '../pages/dashboard/Overview';
import Classes from '../pages/dashboard/Classes';
import Students from '../pages/dashboard/Students';
import ClassReport from '../pages/dashboard/ClassReport';
import StudentDashboard from '../pages/dashboard/StudentDashboard';

// ResizeObserver é necessário para o Recharts (ResponsiveContainer) em ambientes de teste
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Dashboard Panels Avançados & Híbridos', () => {
  it('deve renderizar a Visão Geral (Overview) com métricas híbridas', () => {
    render(
      <MemoryRouter>
        <Overview />
      </MemoryRouter>
    );
    expect(screen.getByText('Visão Geral')).toBeInTheDocument();
    expect(screen.getByText('Perfis Híbridos Detectados')).toBeInTheDocument();
  });

  it('deve renderizar o modal de nova Turma oculto inicialmente na lista de turmas', () => {
    render(
      <MemoryRouter>
        <Classes />
      </MemoryRouter>
    );
    expect(screen.getByText('Nova Turma')).toBeInTheDocument();
  });

  it('deve renderizar a página de alunos e suportar os distintivos dinâmicos "Uso Intensivo de IA"', () => {
    render(
      <MemoryRouter>
        <Students />
      </MemoryRouter>
    );
    expect(screen.getByText('Meus Alunos')).toBeInTheDocument();
    // Um de nossos mock-datas contém o aviso Uso Intensivo de IA
    expect(screen.getAllByText('Uso Intensivo de IA')[0]).toBeInTheDocument();
  });

  it('deve renderizar relatórios analíticos dinâmicos de turmas', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/turmas/1']}>
        <Routes>
          <Route path="/dashboard/turmas/:id" element={<ClassReport />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Composição Recente')).toBeInTheDocument();
  });

  it('deve renderizar a análise consolidada do painel do estudante', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/alunos/s1']}>
        <Routes>
          <Route path="/dashboard/alunos/:id" element={<StudentDashboard />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Perfil do Aluno')).toBeInTheDocument();
    expect(screen.getByText('Última Redação Submetida')).toBeInTheDocument();
  });
});
