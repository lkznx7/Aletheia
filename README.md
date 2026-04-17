<br />
<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sparkles.svg" alt="Logo Lumiar" width="80" height="80">
  <h1 align="center">Lumiar — Copiloto Pedagógico</h1>
  <p align="center">
    O copiloto do professor para enxergar <strong>como</strong> o trabalho foi feito.
    <br />
    <i>Projeto construído para o Hackathon Brasília Virtual – Desafio 2</i>
  </p>
</div>

## 📌 Sobre o Projeto

**Lumiar** é uma ferramenta pedagógica EdTech revolucionária. Seu objetivo é abrir a "caixa-preta" da redação digital submetida nas salas de aula. 
Em vez de servir como um detector policialesco punitivo de uso de IA, o sistema atua como orientador e apresenta *evidências* sobre a autoria, permitindo a identificação estruturada de trechos originados por humanos, o uso massivo intensivo de Inteligência Artificial, e os tão complexos **Padrões Híbridos** (onde o aluno cocriou o texto usando ferramentas de automação somadas a sua voz original).

## 🚀 Funcionalidades Chave

- **Dashboard do Professor (N-Níveis):** 
  - Visores customizados utilizando **Recharts** listando análises quantitativas das produções do mês letivo.
- **Métricas Híbridas de Análise:** Acompanhamento do percentual do perfil submetido: *Autoral, Construção Híbrida ou Uso Intensivo de IA.*
- **Controle de Alunos e Turmas Isoladas:** Sub-dashboards criados gerencialmente (Abaixo de `/dashboard/turmas/:id` e `/dashboard/alunos/:id`) para avaliação micro e macro de deficiências de letramento.
- **Autenticação Simulada Nativa (Mock-JWT):** Capacidade da aplicação preservar estados de conexão (Login/Sign Up) validando dados e credenciais em Base64 usando armazenamento `localStorage` enrijecido. Aprovado em roteamento `ProtectedRoute`.
- **Acessibilidade e Componentização:** Alta responsividade visual e legibilidade pensada usando Radix UI estrita sob diretrizes WCAG AA.

## 🛠 Tecnologias Utilizadas

Este ecossistema foi levantado com as bases tecnológicas do desenvolvimento Front-End moderno:
- **Core:** React 18, Vite e TypeScript
- **Roteamento:** React Router DOM (v6)
- **Design & UI:** Tailwind CSS, Shadcn/UI (Radix Primitives) e ícones pelo Lucide-React
- **Gráficos e Visualização:** Recharts
- **Suíte de Qualidade (Testes):** Vitest + JSDOM com RTL (React Testing Library) implementados focando em TDD nas proteções do Dashboard.

## ⚙️ Como executar o projeto localmente

**1. Clone o repositório e acesse a pasta:**
```bash
git clone https://github.com/esdrasbsbmorais/codebase-frontend-desafio2.git
cd codebase-frontend-desafio2
```

**2. Instale todas as dependências:**
```bash
npm install
```

**3. Inicie o servidor frontend em modo de desenvolvimento:**
```bash
npm run dev
```

**4. Simulação de Login (Acesso Rápido):**
Ao acessar a tela nativa de Login pela aplicação, o painel auto-injetará um objeto pedagógico para testes rápidos. Você pode simplesmente apertar em **Entrar** logando com:
```text
Login: test@test.com
Senha: password123
```

## 🧪 Rodando a Cobertura de Testes
Para inspecionar as rotinas de verificação do `Vitest` em tempo real para os modais, interatividade e detecção autoral de Híbridos nos cartões de React:
```bash
npm run test
```

---
*Desafio resolvido ativamente combinando velocidade em engenharia de interface e propósito profundo estrutural acadêmico.*
