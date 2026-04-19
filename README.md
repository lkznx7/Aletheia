# Aletheia — Copiloto Pedagógico

<div align="center">
  <img src="./public/logo-aletheia.png" alt="Logo Aletheia" width="120">
  <h1>Aletheia</h1>
  <p>O copiloto do professor para enxergar <strong>como</strong> o trabalho foi feito.</p>
  <i>Projeto construído para o Hackathon Brasília Virtual – Desafio 2</i>
</div>

---

## 1. Visão Geral do Projeto

### O que é a Aletheia?

**Aletheia** é uma ferramenta pedagógica EdTech que abre a "caixa-preta" da redação digital submetida nas salas de aula. Em vez de servir como um detector policialesco punitivo de uso de IA, o sistema atua como **orientador pedagógico** e apresenta *evidências* sobre a autoria, permitindo:

- Identificação de trechos **originados por humanos**
- Detecção de uso **massivo/intensivo de Inteligência Artificial**
- Reconhecimento de **Padrões Híbridos** (onde o aluno cocriou o texto usando ferramentas de automação somadas a sua voz original)

### Problema que Resolve

Professores enfrentam uma "caixa-preta" ao avaliar redações digitais:
- Como identificar se o texto foi escrito pelo aluno ou gerado por IA?
- Como distinguir uso responsável de ferramentas de IA de uso massivo?
- Como orientar o aluno sem punir, mas sim ensinar letramento digital?

---

## 2. Funcionalidades

### 2.1 Dashboard do Professor (N-Níveis)

- **Visão Geral** (`/dashboard`): Métricas mensais com gráficos Recharts
- **Por Turma** (`/dashboard/turmas/:id`): Relatórios específicos de cada turma
- **Por Aluno** (`/dashboard/alunos/:id`): Evolução individual

### 2.2 Métricas Híbridas de Análise

O sistema classifica cada produção em:
- **Autoral** (0-30% IA): Texto majoritariamente do aluno
- **Construção Híbrida** (31-60% IA): Mistura equilibrada
- **Uso Intensivo de IA** (61-100% IA): Maior parte gerado por IA

### 2.3 Autenticação Mock-JWT

- Login/Sign Up com dados em localStorage
- Protected Routes bloqueiam acesso não autenticado
- Credenciais de teste automáticas: `test@test.com` / `password123`

### 2.4 Acessibilidade WCAG 2.2

- Alto contraste (sol/lua)
- Redução de movimento
- 3 tamanhos de fonte (normal/grande/extra-grande)
- Suporte LIBRAS (botão, placeholder para vídeo)
- Skip links e ARIA labels

### 2.5 Páginas Extras

- `/inscrever`: Formulário para inscrição de escolas
- `/contato`: Formulário para falar com o time

---

## 3. Arquitetura Técnica

### Stack Tecnológico

| Categoria | Tecnologia |
|-----------|----------|
| Core | React 18, Vite, TypeScript |
| Roteamento | React Router DOM v6 |
| UI | Tailwind CSS, Shadcn/UI (Radix) |
| Ícones | Lucide React |
| Gráficos | Recharts |
| Testes | Vitest + RTL + JSDOM |
| Estado | React Context + TanStack Query |

### Estrutura de Arquivos

```
src/
├── components/          # Componentes React
│   ├── ui/            # Componentes Shadcn/UI
│   ├── sections/      # Seções da landing page
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Logo.tsx
│   └── AccessibilityBar.tsx
├── contexts/           # React Contexts
│   ├── AuthContext.tsx
│   └── AccessibilityContext.tsx
├── hooks/             # Hooks personalizados
│   └── use-api.ts
├── lib/              # Utilitários
│   ├── api.ts        # Client API
│   ├── storage.ts   # localStorage wrapper
│   └── mock-data.ts # Dados/mock
├── pages/            # Páginas
│   ├── Index.tsx           # Landing page
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── EnrollSchool.tsx
│   ├── ContactTeam.tsx
│   ├── NotFound.tsx
│   └── dashboard/       # Páginas do dashboard
├── test/             # Testes Vitest
└── App.tsx          # Router principal
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# API Backend
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
```

Ou use o template `.env.example` como base.

---

## 4. Como Executar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse: `http://localhost:5173`

### Login de Teste

```
E-mail: test@test.com
Senha: password123
```

### Build Produção

```bash
npm run build
```

### Testes

```bash
npm run test
```

---

## 5. Guia de Testes QA

### Testes Existentes (22 testes)

| Suite |Testes | Cobertura |
|-------|------|----------|
| Auth | 10 | Login, Register, form fields, |
| Dashboard | 5 | Métricas, charts, turmas, alunos |
| Pages | 7 | EnrollSchool, ContactTeam, 404, Index |

### Executar Testes Específicos

```bash
# Apenas auth
npm run test -- src/test/auth.test.tsx

# Apenas dashboard
npm run test -- src/test/Dashboard.test.tsx
```

---

## 6. Integração com Backend

### API Client

O arquivo `src/lib/api.ts` fornece um client configurado:

```typescript
import api from './lib/api';

// GET
const data = await api.get('/users');

// POST
const result = await api.post('/login', { email, password });

// PUT
await api.put('/user/1', { name: 'Novo nome' });

// DELETE
await api.delete('/user/1');

// Upload de arquivo
await api.upload('/upload', arquivo, 'documento');
```

### WebSocket (opcional)

```typescript
import { WS_URL } from './lib/api';

const ws = new WebSocket(WS_URL);
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // processar mensagem
};
```

### Headers Automáticos

O client adiciona automaticamente:
- `Content-Type: application/json`
- `Authorization: Bearer {token}` (se disponível)

### Endpoints Esperados

Consulte `API.md` para documentação completa dos endpoints que o backend deve implementar.

| Endpoint | Método | Descrição |
|---------|--------|-----------|
| `/auth/login` | POST | Login |
| `/auth/register` | POST | Cadastro |
| `/auth/me` | GET | Usuário atual |
| `/classes` | GET/POST | Turmas |
| `/classes/:id` | GET/PUT/DELETE | Turma específica |
| `/classes/:classId/students` | GET | Alunos da turma |
| `/analyses` | POST | Enviar análise |
| `/analyses/:id` | GET | Resultado da análise |
| `/dashboard/stats` | GET | Estatísticas |
| `/dashboard/chart` | GET | Dados do gráfico |

---

## 7. Boas Práticas Implementadas

### Tratamento de Erros

- ✅ Try/catch em todas as operações de storage
- ✅ Tratamento de erros HTTP (4xx, 5xx)
- ✅ Logging appropriate (sem console.log em produção é preferível)

### Acessibilidade

- ✅ Skip links para navigation por teclado
- ✅ ARIA labels em todos os componentes interativos
- ✅ Labels explícitas em formulários
- ✅ Botões com ícones + texto

### Segurança

- ✅ Tokens em localStorage (com prefixo `aletheia_`)
- ✅ Headers em todas as requisições API
- ✅ Validação de inputs

---

## 8. Roadmap Sugerido

### Fase 1 (Atual)
- [x] Landing page
- [x] Auth simulada
- [x] Dashboard mock
- [x] Acessibilidade WCAG 2.2

### Fase 2 (Próximos Passos)
- [ ] API real integrada
- [ ] Upload de PDFs
- [ ] Análise textual com IA
- [ ]-relatórios em PDF

### Fase 3 (Melhorias)
- [ ] WebSocket para tempo real
- [ ] Dashboard professoria em tempo real
- [ ] Integração LMS (Moodle, Google Classroom)
- [ ] Vídeo LIBRAS completo

---

## 9. Troubleshooting

### Erro: "localStorage is not defined"

Solução: O código usa server-side rendering? Adicione verificação:
```typescript
const hasLocalStorage = typeof window !== 'undefined' && localStorage;
```

### Erro: "module not found"

Solução: Execute `npm install`

### Testes falhando

Solução: Limpe e reinstale:
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 10. Créditos e Licença

Feito com ❤ em Brasília - DF para o Hackathon Brasília Virtual.

Licença: MIT

---

*Aletheia — onde a verdade (ἀλήθεια) se revela através da evidência.*