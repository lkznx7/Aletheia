# Documentação de Integração API - Aletheia

## Visão Geral

Este documento detalha a API REST que o backend deve implementar para integração com o frontend Aletheia.

**Base URL:** `http://localhost:3001/api` (desenvolvimento)  
**WebSocket:** `ws://localhost:3001` (para notificações em tempo real)

---

## Autenticação

O frontend espera que o backend implemente autenticação JWT.

### Endpoints de Autenticação

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/auth/login` | Login com email e senha |
| POST | `/auth/register` | Cadastro de novo usuário |
| POST | `/auth/logout` | Logout (invalida token) |
| GET | `/auth/me` | Retorna dados do usuário atual |

### POST /auth/login

**Request:**
```json
{
  "email": "professor@escola.com.br",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "name": "Professor Silva",
    "email": "professor@escola.com.br",
    "role": "teacher"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### POST /auth/register

**Request:**
```json
{
  "name": "Professor Silva",
  "email": "professor@escola.com.br",
  "password": "senha123"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "uuid",
    "name": "Professor Silva",
    "email": "professor@escola.com.br",
    "role": "teacher"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /auth/me

**Headers:**
```
Authorization: Bearer <token_jwt>
```

**Response (200):**
```json
{
  "id": "uuid",
  "name": "Professor Silva",
  "email": "professor@escola.com.br",
  "role": "teacher"
}
```

---

## Endpoints da API

### 1. Turmas (Classes)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/classes` | Lista todas as turmas do professor |
| GET | `/classes/:id` | Detalhes de uma turma |
| POST | `/classes` | Cria nova turma |
| PUT | `/classes/:id` | Atualiza turma |
| DELETE | `/classes/:id` | Remove turma |

#### GET /classes

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "classes": [
    {
      "id": "uuid",
      "name": "Turma 3A",
      "code": "#TRM-3A-2024",
      "totalStudents": 32,
      "averageScore": 8.5,
      "warnings": 2,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### POST /classes

**Request:**
```json
{
  "name": "Turma 3B",
  "code": "#TRM-3B-2024"
}
```

---

### 2. Alunos (Students)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/classes/:classId/students` | Lista alunos de uma turma |
| GET | `/students/:id` | Detalhes de um aluno |
| GET | `/students/:id/analyses` | Histórico de análises do aluno |
| PUT | `/students/:id` | Atualiza dados do aluno |

#### GET /classes/:classId/students

**Response (200):**
```json
{
  "students": [
    {
      "id": "uuid",
      "name": "Maria Helena",
      "classId": "uuid",
      "redacoes": 5,
      "iaProbability": 85,
      "lastAnalysis": "2024-03-15T14:00:00Z",
      "alert": "Uso Intensivo de IA"
    }
  ]
}
```

---

### 3. Análises (Analysis)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/analyses` | Envia texto para análise |
| GET | `/analyses/:id` | Resultado de uma análise |
| GET | `/classes/:classId/analyses` | Histórico de análises da turma |

#### POST /analyses - ANÁLISE DE REDAÇÃO

**Request (multipart/form-data):**
```
file: File (PDF, DOCX, PPTX)
text: String (opcional - texto colado)
classId: UUID
studentId: UUID
```

**OU Request (JSON):**
```json
{
  "text": "Texto da redação...",
  "classId": "uuid",
  "studentId": "uuid"
}
```

**Response (202) - Início da análise:**
```json
{
  "analysisId": "uuid",
  "status": "processing",
  "progress": 0,
  "startedAt": "2024-03-15T14:00:00Z"
}
```

**WebSocket Evento de Progresso:**
```json
{
  "type": "analysis.progress",
  "data": {
    "analysisId": "uuid",
    "progress": 25,
    "step": "Analisando padrões linguísticos…"
  }
}
```

---

### 4. Resultados de Análise

#### GET /analyses/:id

**Response (200) - Quando concluída:**
```json
{
  "id": "uuid",
  "status": "completed",
  "studentId": "uuid",
  "classId": "uuid",
  "text": "Texto original...",
  "completedAt": "2024-03-15T14:07:00Z",
  "result": {
    "segments": [
      {
        "type": "human",
        "text": "Primeiro parágrafo...",
        "note": "Tom natural, vocabulário coerente com o ano escolar."
      },
      {
        "type": "ai",
        "text": "Sob a perspectiva multifacetada...",
        "note": "Mudança brusca de registro. Vocabulário 4x mais denso. Padrão típico de IA generativa."
      },
      {
        "type": "fabricated",
        "text": "87,3% dos historiadores...",
        "note": "Estatística suspeita: número exato sem fonte rastreável."
      }
    ],
    "sources": [
      {
        "label": "Wikipedia, 2023",
        "status": "warn",
        "note": "Fonte aberta sem revisão por pares."
      },
      {
        "label": "Silva (2024)",
        "status": "fail",
        "note": "Citação não localizada em bases acadêmicas."
      },
      {
        "label": "Hobsbawm, E. (1962)",
        "status": "ok",
        "note": "Obra canônica verificada."
      }
    ],
    "timeline": [
      { "t": "14:02", "e": "Documento criado", "n": "Documento em branco." },
      { "t": "14:18", "e": "Primeiro parágrafo escrito", "n": "352 caracteres em 16min." },
      { "t": "14:23", "e": "Bloco colado", "n": "Inserção instantânea. Origem externa provável.", "flag": true },
      { "t": "14:45", "e": "Conclusão escrita", "n": "Volta ao ritmo natural." }
    ],
    "score": "medium",
    "recommendations": [
      "Você poderia me contar com suas palavras o que mais te chamou atenção?",
      "Como você chegou até a fonte 'Silva (2024)'?",
      "Qual destes parágrafos você sente que foi o mais difícil de escrever?"
    ]
  }
}
```

**Valores возможные de `status`:**
- `ok` - Fonte verificada
- `warn` - Fonte com ressalvas
- `fail` - Fonte não localizada/fabricada

**Valores de `type` para segments:**
- `human` - Voz própria provável
- `ai` - Padrão típico de IA
- `fabricated` - Possível fabricação

**Valores de `score`:**
- `low` - Baixa evidência
- `medium` - Evidência moderada
- `high` - Alta evidência

---

### 5. Dashboard / Estatísticas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/dashboard/stats` | Estatísticas gerais |
| GET | `/dashboard/chart` | Dados para gráfico de tendência |

#### GET /dashboard/stats

```json
{
  "stats": [
    { "label": "Total de Alunos", "value": "95", "trend": "+2" },
    { "label": "Turmas Ativas", "value": "3", "trend": "0" },
    { "label": "Textos Avaliados", "value": "1240", "trend": "+120" },
    { "label": "Perfis Híbridos", "value": "28", "trend": "+5" }
  ]
}
```

#### GET /dashboard/chart

```json
{
  "chart": [
    { "month": "Mar", "ia": 15, "hibrido": 40, "autoral": 120 },
    { "month": "Abr", "ia": 22, "hibrido": 50, "autoral": 150 }
  ]
}
```

---

## Códigos de Erro

| Código | Descrição |
|--------|-----------|
| 400 | Requisição mal formatada |
| 401 | Não autorizado (token inválido/expirado) |
| 403 | Acesso proibido |
| 404 | Recurso não encontrado |
| 422 | Dados inválidos |
| 500 | Erro interno do servidor |

### Formato de Erro

```json
{
  "error": {
    "code": "INVALID_TOKEN",
    "message": "Token de autenticação inválido ou expirado"
  }
}
```

---

## WebSocket events

O backend deve implementar WebSocket para notificações em tempo real:

| Evento | Descrição |
|--------|-----------|
| `analysis.progress` | Progresso da análise (0-100%) |
| `analysis.completed` | Análise concluída |
| `analysis.error` | Erro na análise |

### Conexão WebSocket

```javascript
const ws = new WebSocket('ws://localhost:3001');

ws.onopen = () => {
  // Enviar token para autenticação
  ws.send(JSON.stringify({ type: 'auth', token: 'jwt_token' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // handling de eventos
};
```

---

## Variáveis de Ambiente

No frontend (.env):

```
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=ws://localhost:3001
```

---

## Fluxo de Uso

### 1. Professor faz login
```
POST /auth/login → recebe token JWT
```

### 2. Professor cria/gerencia turmas
```
GET /classes → lista turmas
POST /classes → cria turma
```

### 3. Professor analisa redação
```
POST /analyses com arquivo ou texto
  → recebe analysisId
  → escuta WebSocket para progress
  → GET /analyses/:id para resultado
```

### 4. Professor visualiza dashboard
```
GET /dashboard/stats
GET /dashboard/chart
```

---

## Headers Obrigatórios

Todas as requisições autenticadas devem incluir:

```
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

Para upload de arquivos:

```
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data
```

---

## Notas de Implementação

1. **Privacidade**: O backend NÃO deve armazenar os textos das redações após análise. Implementar política de retenção zero.

2. **Timeout**: Análises devem ter timeout de 5 minutos. Retornar erro 408 se exceder.

3. **Rate Limiting**: Implementar rate limit de 10 requisições/minuto por usuário.

4. **LGPD**: Garantir conformidade com LGPD. Dados de alunos devem ser anonimizados em logs.

5. **Validação de Fontes**: O backend deve validar citações em:
   - bases acadêmicas (Scielo, Google Scholar)
   - repositórios abertos
   - índice de credibilidade